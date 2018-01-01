import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import WaveFormInterface from './components/WaveForm/WaveFormInterface';
import WaveformData from 'waveform-data';

class App extends Component {
  constructor(props) {
    super(props);
  }

  static state = {
    waveformData: null,
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
          height={300}
          amplitude={126}
        />
      </div>
    ) : null;
  }
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
