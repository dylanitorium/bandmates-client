import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import WaveformData from 'waveform-data';
import WaveFormLayer from './WaveFormLayer';
import InterfaceLayer from './InterfaceLayer';
import SegmentsLayer from './SegmentsLayer';
import CursorLayer from './CursorLayer';
import Audio from '../Audio';

class WaveFormInterface extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      segments: [],
      waveformData: props.data.resample(props.width),
      currentTime: 0,
    };
  }

  updateCursorPosition() {
    return (currentTime) => this.setState({ currentTime });
  }

  createSegment() {
    const secondsPerPixel = this.state.waveformData.seconds_per_pixel
    return ({ start, end }) => {
      this.setState({
        segments: [
          ...this.state.segments,
          {
            start,
            end,
            startSeconds: start * secondsPerPixel,
            endSeconds: end * secondsPerPixel,
          }
        ]
      });
    }
  }

  getLayers() {
    return (
      <Layer>
        <WaveFormLayer {...this.props} data={this.state.waveformData} />
        <SegmentsLayer {...this.props} segments={this.state.segments}  />
        <CursorLayer {...this.props} currentTime={this.state.currentTime} data={this.state.waveformData} />
        <InterfaceLayer onCreateSegment={this.createSegment()} {...this.props}  />
      </Layer>
    );
  }


  render() {
    return (
      <div>
        <Stage width={this.props.width} height={this.props.height}>
          {this.getLayers()}
        </Stage>
        <Audio
          source="Fortress_latest.mp3"
          onTick={this.updateCursorPosition()}
          tickInterval={this.state.waveformData.seconds_per_pixel}
        />
      </div>
    )
  }
}

WaveFormInterface.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(WaveformData).isRequired,
};



export default WaveFormInterface;
