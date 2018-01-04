import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import WaveformData from 'waveform-data';
import BasicAudioFile from 'utils/BasicAudioFile';
import * as constants from 'utils/constants';
import WaveFormLayer from './WaveFormLayer';
import InterfaceLayer from './InterfaceLayer';
import CursorLayer from './CursorLayer';


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

    const cursor = {
      width: '2px',
      height: constants.DEFAULT_WAVEFORM_HEIGHT,
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: (props.windowWidth/2) - 1,
    };

    return (
      <div style={containerStyle}>
        <div>
          <Stage width={props.windowWidth} height={props.height}>
            <Layer>
              <WaveFormLayer {...props} />
            </Layer>
          </Stage>
        </div>
        <span style={cursor}></span>
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
