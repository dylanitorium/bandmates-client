import React from 'react';
import PropTypes from 'prop-types';
import WaveformData from 'waveform-data';
import styles from './waveform-layer.css';

const WaveFormLayer = (props) => {

  const POINT_MOD = 0.5;

  const modPoint = (point, offset) => (
    (offset ? offset - point : point) + POINT_MOD
  );

  const interpolateY = (size) => (
    props.height - ((size + props.amplitude / 2) * props.height) / props.amplitude
  );

  let pathData = `M 0 ${props.height /2}`;

  const drawPoint = (offset) => (
    (y, x) => (
      pathData = `${pathData} L ${modPoint(x, offset)}  ${modPoint(interpolateY(y))}`
    )
  );

  props.data.min.forEach(drawPoint());
  props.data.max.reverse().forEach(drawPoint(props.data.offset_length));

  return (
    <div className={styles.container}>
      <svg width={props.width} height={props.height} style={{ transform: `translate(${props.waveformOffset}px, 0px)` }}>
        <path d={pathData} fill={props.color} stroke={props.color} strokeWidth={1} />
      </svg>
    </div>
  );
};

WaveFormLayer.propTypes = {
  waveformOffset: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  amplitude: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(WaveformData),
};

WaveFormLayer.defaultProps = {
  color: '#20d8ba',
};

export default WaveFormLayer;
