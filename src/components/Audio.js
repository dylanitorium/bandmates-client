import React, { Component } from 'react';

class Audio extends Component {
  constructor(props) {
    super(props);


  }

  loadAudio() {
    return fetch(this.props.source)
      .then(response => response.arrayBuffer())
  }


  componentDidMount() {

    const context = new AudioContext();
    this.loadAudio()
      .then((buffer) => context.decodeAudioData(buffer))
      .then((buffer) => {
        const context = new AudioContext();
        const gain = context.createGain();
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(gain);
        gain.connect(context.destination);
        source.start(context.currentTime);
        setInterval(() => {
          this.props.onTick(context.currentTime);
        }, this.props.tickInterval)
      });


  }

  render() {
    return (<div />);
  }
}

export default Audio;
