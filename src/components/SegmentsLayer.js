import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

const SegmentsLayer = props => {
  const segments = Object.values(props.segments);
  if (!segments.length) {
    return null;
  }

  console.log(segments)

  return Object.values(segments).map((segment, index) => (
    <Rect
      key={index}
      opacity={0.5}
      x={segment.start}
      width={segment.end - segment.start}
      height={props.height}
      fill="grey"
      stroke="grey"
      strokeWidth={1}
    />
  ));
};

SegmentsLayer.defaultProps = {
  segments: {},
}

export default SegmentsLayer;
