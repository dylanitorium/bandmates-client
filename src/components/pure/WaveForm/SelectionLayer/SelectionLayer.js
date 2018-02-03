import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from '../../Draggable/Draggable';
import styles from './selection-layer.css';

const SelectionLayer = props =>(
  <Draggable
    containerClass={styles.container}
    controlClass={styles.control}
    controlStyle={{ left: props.selectorPosition }}
    onDrag={props.onSelectionDrag}
    onDragEnd={props.onSelectionEnd}
  />
);


SelectionLayer.propTypes = {
  selectorPosition: PropTypes.number.isRequired,
  onSelectionDrag: PropTypes.func.isRequired,
  onSelectionEnd: PropTypes.func.isRequired,
};

export default SelectionLayer;
