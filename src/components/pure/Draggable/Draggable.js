import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { conditionalClasses } from 'utils/conditionalClasses';
import draggable from './draggable.css';

class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      dragStart: 0,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
  }

  startDrag(clientX) {
    this.setState({
      isDragging: true,
      dragStart: clientX,
    });
  }

  onTouchStart(event) {
    const { touches } = event;
    const { clientX } = touches[0];

    this.startDrag(clientX);
  }

  onMouseDown(event) {
    const { clientX } = event;

    this.startDrag(clientX);
  }

  dragMove (clientX) {
    const { isDragging, dragStart } = this.state;

    if (!isDragging || this.isAnimating) {
      return;
    }

    this.isAnimating = true;

    requestAnimationFrame(() => {
      const movement = clientX - dragStart;
      this.props.onDrag(movement);

      this.setState({
        dragStart: clientX,
      });

      this.isAnimating = false;
    })
  }

  onTouchMove(event) {
    const { touches } = event;
    const { clientX } = touches[0];

    this.dragMove(clientX);
  }

  onMouseMove(event) {
    const { clientX } = event;

    this.dragMove(clientX);
  }

  onDragEnd(event) {
    this.setState({
      isDragging: false,
    });
  }

  getContainerClasses() {
    return conditionalClasses({
      [this.props.containerClass]: true,
      [draggable.dragging]: this.state.isDragging,
    })
  }

  getControlClasses() {
    return conditionalClasses({
      [this.props.controlClass]: true,
      [draggable.default]: true,
      [draggable.dragging]: this.state.isDragging,
    })
  }

  render() {
    return (
      <div
        className={this.getContainerClasses()}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onDragEnd}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onDragEnd}
        style={this.props.style}
      >
        <div
          className={this.getControlClasses()}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onTouchStart}
          style={this.props.controlStyle}
        />
      </div>
    );
  }
}

Draggable.propTypes = {
  style: PropTypes.object,
};

Draggable.defaultPrope = {
  style: PropTypes.object,
};

export default Draggable;
