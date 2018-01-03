import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

const SegmentsLayer = props => {
  const { segments } = props;
  if (!segments.length) {
    return null;
  }

  return segments.map((segment, index) => (
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

SegmentsLayer.propTypes = {
  height: PropTypes.number.isRequired,
  segments: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    startSeconds: PropTypes.number,
    endSeconds: PropTypes.number,
  })).isRequired,
}

export default SegmentsLayer;
