import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from 'state/store';
import WaveFormInterface from './connected/WaveFormInterface';
import './App.css';

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
