import React, { Component } from 'react';
import BasicAudioFile from '../utils/AudioFile';

class Audio extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const audio = new BasicAudioFile(this.props.source);
    audio.init().then(() => {

      audio.on('update', (currentTime) => {
        this.props.onTick(currentTime)
      });

      audio.play();
    })
  }

  render() {
    return null;
  }
}

export default Audio;
