import React from 'react';
import PropTypes from 'prop-types';
import WaveformData from 'waveform-data';
import { Shape, Rect, Group } from 'react-konva';

const WaveFormLayer = (props) => {
  const POINT_MOD = 0.5;

  const modPoint = (point, offset) => (
    (offset ? offset - point : point) + POINT_MOD
  );

  const interpolateY = (size) => (
    props.height - ((size + props.amplitude / 2) * props.height) / props.amplitude
  );

  const xOffset = (props.cursorPostion  * -1) + (props.windowWidth / 2);
  
  return (
    <Group>
      {/* Drawing */}
      <Shape
        x={xOffset}
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
        fill="#20d8ba"
        stroke="#20d8ba"
        strokeWidth="1"
      />
      {/* Click Catcher */}
      <Rect
        width={props.width}
        height={props.height}
        draggable={true}
        onClick={({ evt: { offsetX } }) => props.onInterfaceClick(offsetX)}
        onTap={(({ evt: { changedTouches } }) => props.onInterfaceClick(changedTouches[0].clientX))}
        onDragMove={({ target: { attrs: { x } } }) => props.onInterfaceDrag(x)}
        dragBoundFunc={function(pos) {
            const min = props.windowWidth / 2;
            const max = min - props.width;
            return {
                x: pos.x >= min
                  ? min
                  : pos.x <= max
                    ? max
                    : pos.x,
                y: this.getAbsolutePosition().y
            }
        }}
      />
    </Group>
  );
};

WaveFormLayer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  amplitude: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(WaveformData),
};

export default WaveFormLayer;
