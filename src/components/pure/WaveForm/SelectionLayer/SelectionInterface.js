import React from 'react';
import PropTypes from 'prop-types';
import Draggable from '../../Draggable/Draggable';
import styles from './selection-layer.css';

const SelectionInterface = props => (
  <Draggable
    containerClass={styles.interface_container}
    controlClass={styles.interface_control}
    controlStyle={{ transform: `translate(${props.selectorPosition}px, 0px)` }}
    onDragStart={props.onSelectionStart}
    onDrag={props.onSelectionDrag}
    onDragEnd={props.onSelectionEnd}
  />
);


SelectionInterface.propTypes = {
  selectorPosition: PropTypes.number.isRequired,
  onSelectionStart: PropTypes.func.isRequired,
  onSelectionDrag: PropTypes.func.isRequired,
  onSelectionEnd: PropTypes.func.isRequired,
};

export default SelectionInterface;
