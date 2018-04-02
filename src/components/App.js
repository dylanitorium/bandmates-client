import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from 'state/store';
import WaveFormInterface from './connected/WaveFormInterface';
import * as Layout from './pure/Layout'
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout.Container>
        <Layout.Header>
          Bandmates
        </Layout.Header>
        <Layout.Main>
          <WaveFormInterface />
        </Layout.Main>
        <Layout.Sidebar>
          Sidebar
        </Layout.Sidebar>
        <Layout.Footer />
      </Layout.Container>
    );
  }
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
