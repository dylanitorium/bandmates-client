import React, { Component } from 'react';
import BasicAudioFile from '../utils/AudioFile';

class Audio extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const audio = new BasicAudioFile(this.props.source);
    audio.init().then(() => {
      audio.play();
      setInterval(() => {
        this.props.onTick(audio.context.currentTime);
      }, this.props.tickInterval);
    })
  }

  render() {
    return (<div />);
  }
}

export default Audio;
