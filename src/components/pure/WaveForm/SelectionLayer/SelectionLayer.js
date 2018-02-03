import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from '../../Draggable/Draggable';
import styles from './selection-layer.css';

class SelectionLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      left: ((this.props.windowWidth / 2) - 3)
    };
  }


  handleDrag = (movement) => {
    const { left } = this.state;
    this.setState({
      left: left + movement,
    })
  }

  render() {
    return (
      <Draggable
        containerClass={styles.container}
        controlClass={styles.control}
        controlStyle={{ left: this.state.left }}
        onDrag={this.handleDrag}
      />
    );
  }
};

SelectionLayer.propTypes = {
  windowWidth: PropTypes.number.isRequired,
};

export default SelectionLayer;
