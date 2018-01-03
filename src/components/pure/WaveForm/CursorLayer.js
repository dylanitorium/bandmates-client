import React from 'react';
import PropTypes from 'prop-types';
import WaveformData from 'waveform-data';
import { Rect } from 'react-konva';

const CursorLayer = props => {
  return (<Rect
    opacity={1}
    x={props.cursorPostion}
    width={0}
    height={props.height}
    fill="red"
    stroke="red"
    strokeWidth={1}
  />)
}

CursorLayer.propTypes = {
  data: PropTypes.instanceOf(WaveformData),
  currentTime: PropTypes.number.isRequired,
}

export default CursorLayer;
