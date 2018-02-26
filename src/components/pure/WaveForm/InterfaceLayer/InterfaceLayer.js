import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'components/pure/Draggable/Draggable';
import { conditionalClasses } from 'utils/conditionalClasses';
import layer from './interface-layer.css';

class InterfaceLayer extends Component {
  getClasses() {
    return conditionalClasses({
      [layer.interface]: true,
    })
  }

  handleInterfaceClick = (event) => {
    console.log(event);
  }

  render() {
    return (
      <Draggable
        onDrag={this.props.onInterfaceDrag}
        containerClass={this.getClasses()}
        controlClass={this.getClasses()}
        onClick={this.handleInterfaceClick}
      />
    );
  }
}

InterfaceLayer.propTypes = {
  onInterfaceDrag: PropTypes.func.isRequired,
};

export default InterfaceLayer;
