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

  getControls() {
    const defaultControls = [
      {
        id: 'waveformScrobbler',
        onDragStart: () => {},
        onDrag: this.props.onInterfaceDrag,
        onDragEnd: () => {},
        onClick: () => {},
        class: this.getClasses(),
      },
      {
        id: 'selectorControl',
        onDragStart: this.props.onSelectionStart,
        onDrag: this.props.onSelectionDrag,
        onDragEnd: this.props.onSelectionEnd,
        onClick: () => {},
        class: layer.selection_control,
        style: { transform: `translate(${this.props.selectorPosition}px, 0px)` },
      }
    ];

    const sectionControls = this.props.sections.map((section, index) => ({
      ...section,
      class: layer.section_control,
      onClick: () => this.props.onSectionClick(section.id),
      onDragStart: () => {},
      onDrag: () => {},
      onDragEnd: () => {},
    }));

    return [
      ...defaultControls,
      ...sectionControls
    ];
  }

  render() {
    return (
      <Draggable
        onDrag={this.props.onInterfaceDrag}
        containerClass={this.getClasses()}
        controls={this.getControls()}
      />
    );
  }
}

InterfaceLayer.propTypes = {
  widthOffset: PropTypes.number.isRequired,
  onInterfaceDrag: PropTypes.func.isRequired,
  selectorPosition: PropTypes.number.isRequired,
  onSelectionStart: PropTypes.func.isRequired,
  onSelectionDrag: PropTypes.func.isRequired,
  onSelectionEnd: PropTypes.func.isRequired,
};

export default InterfaceLayer;
