import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import WaveformData from 'waveform-data';
import WaveFormLayer from './WaveFormLayer';
import InterfaceLayer from './InterfaceLayer';
import SegmentsLayer from './SegmentsLayer';
import CursorLayer, {ConnectCursorLayer} from './CursorLayer';
import { playThunk } from 'state/reducers/audio';

class WaveFormInterface extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      waveformData: props.data.resample(props.width),
    };
  }

  getLayers() {
    return (
      <Layer>
        <WaveFormLayer {...this.props} data={this.state.waveformData} />
        <ConnectCursorLayer {...this.props} data={this.state.waveformData} />
        <InterfaceLayer {...this.props} onClick={
            (event) => {
              if (!this.props.audio) {
                return;
              }

              this.props.play(this.state.waveformData.seconds_per_pixel * event.evt.x);
            }
          } />
      </Layer>
    );
  }


  render() {
    return (
      <div>
        <Stage width={this.props.width} height={this.props.height}>
          {this.getLayers()}
        </Stage>
      </div>
    )
  }
}

WaveFormInterface.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(WaveformData).isRequired,
};



export default connect(
  state => ({
    audio: state.audio.audio,
  }),
  {
    play: playThunk,
  }
)(WaveFormInterface);
