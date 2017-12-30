import React from 'react';
import { Stage, Layer } from 'react-konva';
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
    return ({ start, end }) => {
      this.setState({
        segments: [
          ...this.state.segments,
          {
            start,
            end,
            startSeconds: start * this.state.waveformData.seconds_per_pixel,
            endSeconds: end * this.state.waveformData.seconds_per_pixel,
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



export default WaveFormInterface;
