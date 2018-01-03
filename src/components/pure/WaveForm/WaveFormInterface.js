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
      border: '1px solid black',
      width: props.windowWidth,
      height: constants.DEFAULT_WAVEFORM_HEIGHT,
      overflow: 'hidden',
      background: '#36454F',
      position: 'relative',
    };

    const stageContainer = {
      padding: `0 ${props.windowWidth/2}px`,
      transform: `translate(-${props.cursorPostion}px, 0)`,
      opacity: 1,
      transition: `all 0.3s ease`,
    };


    return (
      <div style={containerStyle}>
        <div style={stageContainer}>
          <Stage width={props.width} height={props.height}>
            <Layer>
              <WaveFormLayer {...props} />
              <InterfaceLayer {...props} />
            </Layer>
          </Stage>
        </div>
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
