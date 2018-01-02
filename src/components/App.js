import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import WaveformData from 'waveform-data';
import { requestAudio, playThunk, pauseThunk } from 'state/reducers/audio';
import { store } from 'state/store';
import WaveFormInterface from './WaveForm/WaveFormInterface';

const ConnectedApp = connect(
  state => ({
    audio: state.audio.audio,
    isPlaying: state.audio.isPlaying,
    isRequesting: state.audio.isRequesting,
  }),
  {
    requestAudio,
    playAudio: playThunk,
    pauseAudio: pauseThunk,
  }
)(class App extends Component {
  state = {
    waveformData: null,
  }

  componentDidMount() {
    fetch('Fortress_latest.dat')
      .then(response => response.arrayBuffer())
      .then(data => WaveformData.create(data))
      .then(waveformData => this.setState({ waveformData }));

    this.props.requestAudio('Fortress_latest.mp3');
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
        {
        this.props.audio ? (
          <button onClick={() => {
              this.props.isPlaying ? this.props.pauseAudio() : this.props.playAudio();
          }}
          > {this.props.isPlaying ? 'Pause' : 'Play'}
          </button>
      ) : this.props.isRequesting ? 'Loading...' : null
      }
      </div>
    ) : null;
  }
});

export default () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);
