import React from 'react';
import PropTypes from 'prop-types';
import { Shape } from 'react-konva';

const WaveForm = (props) => {
  const POINT_MOD = 0.5;

  const modPoint = (point, offset) => (
    (offset ? offset - point : point) + POINT_MOD
  );

  const interpolateY = (size) => (
    props.height - ((size + props.amplitude / 2) * props.height) / props.amplitude
  );

  return (
    <Shape
      sceneFunc={function (context) {
        const drawPoint = (offset) => (
          (y, x) => (
            context.lineTo(modPoint(x, offset), modPoint(interpolateY(y)))
          )
        );

        context.beginPath();
        props.data.min.forEach(drawPoint());
        props.data.max.reverse().forEach(drawPoint(props.data.offset_length));
        context.closePath();
        context.fillStrokeShape(this);
      }}
      fill="black"
      stroke="black"
      strokeWidth="1"
    />
  );
};

WaveForm.propTypes = {

};

export default WaveForm;
