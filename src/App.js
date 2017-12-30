import React, { Component } from 'react';
import WaveFormInterface from './components/WaveForm/WaveFormInterface';

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
    return this.state.waveformData ? (
      <div>
        <WaveFormInterface
          data={this.state.waveformData}
          width={1000}
          height={500}
          amplitude={256}
        />
      </div>
    ) : null;
  }
}

export default App;
