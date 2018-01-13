import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WaveformData from 'waveform-data';
import BasicAudioFile from 'utils/BasicAudioFile';
import WaveFormLayer from './WaveFormLayer/WaveFormLayer';
import PlayButton from './PlayButton/PlayButton';
import ClockLayer from './ClockLayer/ClockLayer';
import CursorLayer from './CursorLayer/CursorLayer';
import InterfaceLayer from './InterfaceLayer/InterfaceLayer';


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
      overflow: 'hidden',
      height: props.height,
    };

    return (
      <div style={containerStyle}>
        <WaveFormLayer {...props}/>
        <ClockLayer {...props} />
        <CursorLayer {...props} />
        <InterfaceLayer {...props} />
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
