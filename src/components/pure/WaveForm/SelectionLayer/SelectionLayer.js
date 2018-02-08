import React from 'react';
import styles from './selection-layer.css';

const SelectionLayer = props => (
  <div className={styles.visualiser}>
    <div style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: (props.windowWidth / 2),
      right: (props.windowWidth / 2) - props.selectorPosition,
      background: 'rgba(200, 200, 200, 0.5)'
    }}></div>
  </div>
);

SelectionLayer.propTypes = {

};

export default SelectionLayer;
