import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import WaveformData from 'waveform-data';
import { requestAudio, playThunk, pauseThunk } from 'state/reducers/audio';
import { store } from 'state/store';
import WaveFormInterface from './connected/WaveFormInterface';

class App extends Component {
  render() {
    return (
        <WaveFormInterface />
    );
  }
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
