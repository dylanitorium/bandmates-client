import { connect } from 'react-redux';
import WaveFormInterface from '../pure/WaveForm/WaveFormInterface';
import * as constants from 'utils/constants';
import * as audio from 'state/modules/audio';
import * as waveform from 'state/modules/waveform';
import * as windowActions from 'state/modules/window';
import * as interfaceActions from 'state/modules/interface';

const mapStateToProps = state => ({
  data: state.waveform.waveform,
  audio: state.audio.audio,
  currentTime: state.audio.currentTime,
  cursorPostion: state.cursor.cursorPostion,
  windowWidth: state.window.width,
  width: constants.DEFAULT_WAVEFORM_WIDTH,
  height: constants.DEFAULT_WAVEFORM_HEIGHT,
  amplitude: constants.DEFAULT_WAVEFORM_AMPLITUDE,
});

const mapDispatchToProps = {
  play: audio.playThunk,
  pause: audio.pauseThunk,
  onMount: () => (
    (dispatch, getState) => {
      dispatch(audio.requestAudio('Fortress_latest.mp3'));
      dispatch(waveform.requestWaveform('Fortress_latest.dat'));
      dispatch(windowActions.listenForResize());
    }
  ),
  requestAudio: audio.requestAudio,
  requestWaveform: waveform.requestWaveform,
  onInterfaceClick: interfaceActions.jumpToTime,
};

const ConnectedWaveFormInterface = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WaveFormInterface);

export default ConnectedWaveFormInterface;
