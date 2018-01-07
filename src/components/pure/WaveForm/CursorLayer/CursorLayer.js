import React from 'react';
import PropTypes from 'prop-types';
import cursor from './cursor-layer.css';

const CursorLayer = props => (
  <div>
    <span style={{ left: props.windowWidth / 2 + 'px' }} className={cursor.top}></span>
    <span style={{ left: props.windowWidth / 2 + 'px' }} className={cursor.main}></span>
    <span style={{ left: props.windowWidth / 2 + 'px' }} className={cursor.bottom}></span>
  </div>
);

CursorLayer.propTypes = {
  windowWidth: PropTypes.number.isRequired,
}

export default CursorLayer;
