import { connect } from 'react-redux';
import WaveFormInterface from '../pure/WaveForm/WaveFormInterface';
import * as constants from 'utils/constants';
import * as audio from 'state/modules/audio';
import * as waveform from 'state/modules/waveform';
import * as windowActions from 'state/modules/window';
import * as interfaceActions from 'state/modules/interface';
import * as selectionActions from 'state/modules/selection';
import * as sectionsActions from 'state/modules/sections';

const mapStateToProps = state => ({
  data: state.waveform.waveform,
  audio: state.audio.audio,
  currentTime: state.audio.currentTime,
  cursorPostion: state.cursor.cursorPostion,
  windowWidth: state.window.width,
  isPlaying: state.audio.isPlaying,
  audioIsRequesting: state.audio.isRequesting,
  width: constants.DEFAULT_WAVEFORM_WIDTH,
  height: constants.DEFAULT_WAVEFORM_HEIGHT,
  amplitude: constants.DEFAULT_WAVEFORM_AMPLITUDE,
  selectorPosition: selectionActions.selectorPositionSelector(state),
  activeSectionStart: selectionActions.selectorOffsetSelector(state),
});

const mapDispatchToProps = {
  play: audio.playThunk,
  pause: audio.pauseThunk,
  onMount: () => (
    (dispatch, getState) => {
      dispatch(audio.requestAudio('Fortress_latest.mp3'));
      dispatch(waveform.requestWaveform('Fortress_latest.dat'));
      dispatch(windowActions.listenForResize());
      dispatch(interfaceActions.registerKeyboardEvents());
    }
  ),
  requestAudio: audio.requestAudio,
  requestWaveform: waveform.requestWaveform,
  onInterfaceClick: interfaceActions.jumpToTime,
  onInterfaceDrag: interfaceActions.dragToTime,
  onPlayClick: interfaceActions.playToggle,
  onSelectionStart: selectionActions.startSelectionThunk,
  onSelectionDrag: selectionActions.dragSelector,
  onSelectionEnd: sectionsActions.createSectionThunk,
};

const ConnectedWaveFormInterface = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WaveFormInterface);

export default ConnectedWaveFormInterface;
