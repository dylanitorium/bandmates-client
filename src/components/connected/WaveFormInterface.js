import { connect } from 'react-redux';
import WaveFormInterface from '../pure/WaveForm/WaveFormInterface';
import * as audio from 'state/modules/audio/actions';
import * as waveform from 'state/modules/waveform/actions';
import * as windowActions from 'state/modules/window/actions';
import * as interfaceActions from 'state/modules/interface/actions';
import {
  waveformSelector,
  waveformHeightSelector,
  amplitudeSelector,
  waveformWidthSelector,
} from 'state/selectors';

const mapStateToProps = state => ({
  data: waveformSelector(state),
  height: waveformHeightSelector(state),
  amplitude: amplitudeSelector(state),
  width: waveformWidthSelector(state),
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
