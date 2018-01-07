import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import WaveformData from 'waveform-data';
import BasicAudioFile from 'utils/BasicAudioFile';
import * as constants from 'utils/constants';
import WaveFormLayer from './WaveFormLayer';
import PlayButton from './PlayButton/PlayButton';
import ClockLayer from './ClockLayer/ClockLayer';


class WaveFormInterface extends Component {
  componentDidMount() {
    const { props } = this;
    props.onMount();
  }

  render() {
    const { props } = this;

    if (!props.data) {
      return null;
    }

    const containerStyle = {
      background: '#36454F',
      position: 'relative',
    };





    return (
      <div style={containerStyle}>
        <WaveFormLayer {...props}/>
        <ClockLayer {...props} />
        <CursorLayer {...props} />
        <PlayButton {...props} />
      </div>
    );
  }
}

WaveFormInterface.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  amplitude: PropTypes.number.isRequired,
  audio: PropTypes.instanceOf(BasicAudioFile),
  data: PropTypes.instanceOf(WaveformData),
};

export default WaveFormInterface;
