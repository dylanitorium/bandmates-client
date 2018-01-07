import React from 'react';
import PropTypes from 'prop-types';
import * as timeUtils from 'utils/time';
import clock from './clock-layer.css';

const ClockLayer = props => (
  <div className={clock.clock}>
  {timeUtils.toClock(props.currentTime)}
  </div>
);

ClockLayer.propTypes = {
  currentTime: PropTypes.number.isRequired,
};

export default ClockLayer;
