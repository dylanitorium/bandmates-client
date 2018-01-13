import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    this.setState({
      isDragging: true,
    });
  }

  onMouseMove(event) {
    if (!this.state.isDragging) {
      return;
    }

    const { ...e } = event;
    console.log(e);
  }

  onMouseUp(event) {
    this.setState({
      isDragging: false,
    });
  }

  render() {
    return (
      <div
        className={layer.interface}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      />
    );
  }
}

export default InterfaceLayer;
