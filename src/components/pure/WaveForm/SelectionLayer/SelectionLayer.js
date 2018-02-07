import React from 'react';
import PropTypes from 'prop-types';
import styles from './selection-layer.css';

const SelectionLayer = props => (
  <div className={styles.visualiser}>
    <div style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: props.windowWidth / 2,
      width: props.selectorPosition - (props.windowWidth / 2) + 3,
      background: 'rgba(200, 200, 200, 0.5)'
    }}></div>
  </div>
);

SelectionLayer.propTypes = {

};

export default SelectionLayer;
