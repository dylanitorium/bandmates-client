import React from 'react';
import styles from './selection-layer.css';

const SelectionLayer = props => (
  <div className={styles.visualiser}>
    {props.isDragging && (
      <div className={styles.layer} style={{
        left: props.selectionLeft,
        right: props.selectionRight,
      }}></div>
    )}
  </div>
);

SelectionLayer.propTypes = {

};

export default SelectionLayer;
