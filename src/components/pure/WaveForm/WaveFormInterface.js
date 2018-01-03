import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import WaveformData from 'waveform-data';
import BasicAudioFile from 'utils/BasicAudioFile';
import WaveFormLayer from './WaveFormLayer';
import InterfaceLayer from './InterfaceLayer';
import CursorLayer from './CursorLayer';



class WaveFormInterface extends Component {
  componentDidMount() {
    const { props } = this;

    props.requestAudio('Fortress_latest.mp3');
    props.requestWaveform('Fortress_latest.dat');
  }

  render() {
    const { props } = this;

    if (!props.data) {
      return null;
    }

    return (
      <div>
        <Stage width={props.width} height={props.height}>
          <Layer>
            <WaveFormLayer {...props} />
            <CursorLayer {...props} />
            <InterfaceLayer {...props} onInterfaceClick={
                (event) => {
                  if (!props.audio) {
                    return;
                  }
                  props.play(props.data.seconds_per_pixel * event.evt.x);
                }
              } />
          </Layer>
        </Stage>
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
