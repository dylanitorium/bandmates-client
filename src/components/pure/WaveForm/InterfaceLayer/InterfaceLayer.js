import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'components/pure/Draggable/Draggable';
import SectionLayer from 'components/pure/WaveForm/SectionLayer/SectionLayer';
import { conditionalClasses } from 'utils/conditionalClasses';
import layer from './interface-layer.css';

class InterfaceLayer extends Component {
  getClasses() {
    return conditionalClasses({
      [layer.interface]: true,
    })
  }

  handleSectionClick = (sectionId) => {
    console.log(sectionId);
  }

  render() {
    return (
      <Draggable
        onDrag={this.props.onInterfaceDrag}
        containerClass={this.getClasses()}
        controlClass={this.getClasses()}

      >
        <SectionLayer
          {...this.props}
        />
      </Draggable>
    );
  }
}

InterfaceLayer.propTypes = {
  onInterfaceDrag: PropTypes.func.isRequired,
};

export default InterfaceLayer;
