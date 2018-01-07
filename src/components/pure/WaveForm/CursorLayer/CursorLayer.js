import React from 'react';
import PropTypes from 'prop-types';
import cursor from './cursor-layer.css';

const CursorLayer = props => (
  <div className={cursor.container} style={{ left: props.windowWidth / 2 + 'px' }}>
    <span className={cursor.main}></span>
    <span className={cursor.top}></span>
    <span className={cursor.bottom}></span>
  </div>
);

CursorLayer.propTypes = {
  windowWidth: PropTypes.number.isRequired,
}

export default CursorLayer;
