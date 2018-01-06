import BasicAudioFile from 'utils/BasicAudioFile';

export const playButton = {
  loading: {
    audio: null,
    isPlaying: false,
    onPlayClick: (event) => event,
  },
  paused: {
    audio: new BasicAudioFile(),
    isPlaying: false,
    onPlayClick: (event) => event,
  },
  playing: {
    audio: new BasicAudioFile(),
    isPlaying: true,
    onPlayClick: (event) => event,
  },
};
