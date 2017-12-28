import React from 'react';
import { Stage, Layer } from 'react-konva';
import WaveForm from './WaveForm';
import Interface from './Interface';

class WaveFormInterface extends React.Component {
  constructor(props) {
    super(props)
  }

  getLayers() {
    if (!this.props.data) {
      return;
    }

    const data = this.props.data.resample({
      width: this.props.width
    });

    return (
      <Layer>
        <WaveForm {...this.props} data={data}  />
        <Interface  {...this.props} />
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
