import React, { Component } from 'react';
import WaveFormInterface from './components/WaveFormInterface';
import WaveformData from 'waveform-data';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waveformData: null,
    }
  }

  componentDidMount() {
    fetch('Fortress_latest.dat')
      .then(response => response.arrayBuffer())
      .then(data => WaveformData.create(data))
      .then(waveformData => this.setState({ waveformData }));
  }

  render() {
    return (
      <WaveFormInterface
        data={this.state.waveformData}
        width={1000}
        height={500}
        amplitude={256}
      />
    );
  }
}

export default App;
