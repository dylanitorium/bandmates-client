import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Rect } from 'react-konva';

const CursorLayer = props => {
  return (<Rect
    opacity={1}
    x={props.data.pixels_per_second * props.currentTime}
    width={1}
    height={props.height}
    fill="red"
    stroke="red"
    strokeWidth={1}
  />)
}

export default CursorLayer;

export const ConnectCursorLayer = connect(
  state => ({
    currentTime: state.audio.currentTime,
  }),
)(CursorLayer);
