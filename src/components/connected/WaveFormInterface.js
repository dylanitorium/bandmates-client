import { connect } from 'react-redux';
import WaveFormInterface from '../pure/WaveForm/WaveFormInterface';
import * as constants from 'utils/constants';
import * as audio from 'state/modules/audio/actions';
import * as waveform from 'state/modules/waveform/actions';
import * as windowActions from 'state/modules/window/actions';
import * as interfaceActions from 'state/modules/interface/actions';

const mapStateToProps = state => ({
  data: state.waveform.waveform,
  height: state.waveform.height,
  amplitude: state.waveform.amplitude,
  width: state.waveform.width,
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
