import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { conditionalClasses } from 'utils/conditionalClasses';
import draggable from './draggable.css';

/**
 * @callback onDrag
 * @param {number} movement
 */

/**
 * @class
 * @prop {onDrag} onDrag
 * @prop {string} containerClass
 * @prop {string} controlClass
 * @prop {object} controlStyle
 */
class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      dragStart: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('mouseup', this.onDragEnd);
    window.addEventListener('touchend', this.onDragEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onDragEnd);
    window.removeEventListener('touchend', this.onDragEnd);
  }

  startDrag = (clientX) => {
    this.setState({
      isDragging: true,
      dragStart: clientX,
    });

    this.props.onDragStart(clientX);
  }

  onTouchStart = (event) =>  {
    const { touches } = event;
    const { clientX } = touches[0];

    this.startDrag(clientX);
  }

  onMouseDown = (event) =>  {
    const { clientX } = event;

    this.startDrag(clientX);
  }

  dragMove = (clientX) => {
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

  onTouchMove = (event) =>  {
    const { touches } = event;
    const { clientX } = touches[0];

    this.dragMove(clientX);
  }

  onMouseMove = (event) =>  {
    const { clientX } = event;

    this.dragMove(clientX);
  }

  onDragEnd = (event) =>  {
    this.setState({
      isDragging: false,
    });

    this.props.onDragEnd(event);
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
  containerClass: PropTypes.string,
  controlClass: PropTypes.string,
  controlStyle: PropTypes.object,
  onDrag: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
};

Draggable.defaultProps = {
  containerClass: undefined,
  controlClass: undefined,
  controlStyle: undefined,
  onDragStart: () => {},
  onDrag: () => {},
  onDragEnd: () => {},
};

export default Draggable;
