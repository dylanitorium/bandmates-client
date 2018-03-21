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

    const sectionSelectControls = this.props.sections.map((section, index) => ({
      id: section.id + '_select',
      style: section.styles.select,
      class: layer.section_control,
      onClick: () => this.props.onSectionClick(section.id),
      onDragStart: () => {},
      onDrag: () => {},
      onDragEnd: () => {},
    }));

    const sectionLeftEditControls = this.props.sections.map((section, index) => ({
      id: section.id + '_leftEdit',
      style: section.styles.leftEdit,
      class: layer.section_edit_control,
      onClick: () => {},
      onDragStart: () => {},
      onDrag: (movement) => this.props.onSectionStartDrag(section.id, movement),
      onDragEnd: () => {},
    }));

    const sectionRightEditControls = this.props.sections.map((section, index) => ({
      id: section.id + '_rightEdit',
      style: section.styles.rightEdit,
      class: layer.section_edit_control,
      onClick: () => {},
      onDragStart: () => {},
      onDrag: (movement) => this.props.onSectionEndDrag(section.id, movement),
      onDragEnd: () => {},
    }));

    return [
      ...defaultControls,
      ...sectionSelectControls,
      ...sectionLeftEditControls,
      ...sectionRightEditControls,
    ];
  }

  render() {
    return (
      <Draggable
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
