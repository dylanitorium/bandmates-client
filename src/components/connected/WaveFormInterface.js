import { connect } from 'react-redux';
import WaveFormInterface from '../pure/WaveForm/WaveFormInterface';
import * as constants from 'utils/constants';
import * as audio from 'state/modules/audio';
import * as waveform from 'state/modules/waveform';
import * as windowActions from 'state/modules/window';
import * as interfaceActions from 'state/modules/interface';

const mapStateToProps = state => ({
  data: state.waveform.waveform,
  height: constants.DEFAULT_WAVEFORM_HEIGHT,
  amplitude: constants.DEFAULT_WAVEFORM_AMPLITUDE,
});

const mapDispatchToProps = {
  onMount: () => (
    (dispatch, getState) => {
      dispatch(audio.requestAudio('Fortress_latest.mp3'));
      dispatch(waveform.requestWaveform('Fortress_latest.dat'));
      dispatch(windowActions.listenForResize());
      dispatch(interfaceActions.registerKeyboardEvents());
    }
  ),
};

const ConnectedWaveFormInterface = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WaveFormInterface);

export default ConnectedWaveFormInterface;
