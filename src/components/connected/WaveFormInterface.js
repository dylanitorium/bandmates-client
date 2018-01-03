import { connect } from 'react-redux';
import WaveFormInterface from '../pure/WaveForm/WaveFormInterface';
import * as constants from 'utils/constants';
import * as audio from 'state/reducers/audio';
import * as waveform from 'state/reducers/waveform/index';

const mapStateToProps = state => {console.log(state); return {
  data: state.waveform.waveform,
  audio: state.audio.audio,
  currentTime: state.audio.currentTime,
  cursorPostion: state.waveform.cursorPostion,
  width: constants.DEFAULT_WAVEFORM_WIDTH,
  height: constants.DEFAULT_WAVEFORM_HEIGHT,
  amplitude: constants.DEFAULT_WAVEFORM_AMPLITUDE,
}};

const mapDispatchToProps = {
  play: audio.playThunk,
  pause: audio.pauseThunk,
  requestAudio: audio.requestAudio,
  requestWaveform: waveform.requestWaveform,
};

const ConnectedWaveFormInterface = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WaveFormInterface);

export default ConnectedWaveFormInterface;
