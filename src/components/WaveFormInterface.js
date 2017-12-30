import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import WaveformData from 'waveform-data';
import WaveFormLayer from './WaveFormLayer';
import InterfaceLayer from './InterfaceLayer';
import SegmentsLayer from './SegmentsLayer';

class WaveFormInterface extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      segments: [],
      waveformData: props.data.resample(props.width),
    };
  }

  createSegment() {
    const pixelsPerSecond = this.state.waveformData.seconds_per_pixel
    return ({ start, end }) => {
      this.setState({
        segments: [
          ...this.state.segments,
          {
            start,
            end,
            startSeconds: start * pixelsPerSecond,
            endSeconds: end * pixelsPerSecond,
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
        <InterfaceLayer onCreateSegment={this.createSegment()} {...this.props}  />
      </Layer>
    );
  }

  render() {
    return (
      <Stage width={this.props.width} height={this.props.height}>
        {this.getLayers()}
      </Stage>
    )
  }
}

WaveFormInterface.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(WaveformData).isRequired,
};



export default WaveFormInterface;
