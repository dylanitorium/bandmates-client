import { connect } from 'react-redux';
import WaveFormInterface from '../pure/WaveForm/WaveFormInterface';
import * as constants from 'utils/constants';
import * as audio from 'state/modules/audio';
import * as waveform from 'state/modules/waveform';
import * as interfaceActions from 'state/modules/interface';

const mapStateToProps = state => ({
  data: state.waveform.waveform,
  audio: state.audio.audio,
  currentTime: state.audio.currentTime,
  cursorPostion: state.cursor.cursorPostion,
  width: constants.DEFAULT_WAVEFORM_WIDTH,
  height: constants.DEFAULT_WAVEFORM_HEIGHT,
  amplitude: constants.DEFAULT_WAVEFORM_AMPLITUDE,
});

const mapDispatchToProps = {
  play: audio.playThunk,
  pause: audio.pauseThunk,
  requestAudio: audio.requestAudio,
  requestWaveform: waveform.requestWaveform,
  onInterfaceClick: interfaceActions.jumpToTime,
};

const ConnectedWaveFormInterface = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WaveFormInterface);

export default ConnectedWaveFormInterface;
