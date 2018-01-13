import React, { Component } from 'react';
import { conditionalClasses } from 'utils/conditionalClasses';
import layer from './interface-layer.css';

class InterfaceLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      dragStart: 0,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onMouseDown(event) {
    const { clientX } = event;

    this.setState({
      isDragging: true,
      dragStart: clientX,
    });
  }

  onMouseMove(event) {
    const { isDragging, dragStart } = this.state;
    const { clientX } = event;

    if (!isDragging || this.isAnimating) {
      return;
    }

    this.isAnimating = true;

    requestAnimationFrame(() => {
      const movement = clientX - dragStart;
      this.props.onInterfaceDrag(movement);

      this.setState({
        dragStart: clientX,
      });

      this.isAnimating = false;
    })
  }

  onMouseUp(event) {
    this.setState({
      isDragging: false,
    });
  }

  getClasses() {
    return conditionalClasses({
      [layer.interface]: true,
      [layer.dragging]: this.state.isDragging,
    })
  }

  render() {
    return (
      <div
        className={this.getClasses()}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      />
    );
  }
}

export default InterfaceLayer;
