import React, { Component } from 'react';
import PropTypes from 'prop-types';
import layer from 'interface-layer.css';

class InterfaceLayer extends Component {
  constructor(props) {
    super(props);

    this.setState({
      isDragging: false,
      dragStart: 0,
    });

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown(event) {
    const { target: { xOffset } } = event;

    this.setState({
      isDragging: true,
      dragStart: xOffset,
    });
  }

  onMouseUp(event) {
    if (!this.state.isDragging) {
      return;
    }

    const { target: { xOffset } } = event;

    this.setState({
      isDragging: false,
    });

    const distance = xOffset - this.state.dragStart;

    this.props.onInterfaceDrag(distance)
  }

  render() {
    return <div className={layer.interface} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} />
  }
}

export default InterfaceLayer;
