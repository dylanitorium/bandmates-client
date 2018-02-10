import React from 'react';
import styles from './selection-layer.css';

const SelectionLayer = props => (
  <div className={styles.visualiser}>
    {console.log(props)}
    {true && (
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: props.selectionLeft,
        right: props.selectionRight,
        background: 'rgba(255, 255, 255, 0.5)'
      }}></div>
    )}
  </div>
);

SelectionLayer.propTypes = {

};

export default SelectionLayer;
