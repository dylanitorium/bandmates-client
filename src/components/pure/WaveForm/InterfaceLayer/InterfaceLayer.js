import React, { Component } from 'react';
import Draggable from 'components/pure/Draggable/Draggable';
import { conditionalClasses } from 'utils/conditionalClasses';
import layer from './interface-layer.css';

class InterfaceLayer extends Component {
  getClasses() {
    return conditionalClasses({
      [layer.interface]: true,
    })
  }

  render() {
    return (
      <Draggable
        onDrag={this.props.onInterfaceDrag}
        containerClass={this.getClasses()}
        controlClass={this.getClasses()}
      />
    );
  }
}

export default InterfaceLayer;
