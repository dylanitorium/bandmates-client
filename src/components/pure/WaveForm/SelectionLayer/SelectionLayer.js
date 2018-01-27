import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './selection-layer.css';

class SelectionLayer extends Component {
  render() {
    <div className={styles.container}>
      <Draggable className={styles.control} />
    </div>
  }
}

export default SelectionLayer;
