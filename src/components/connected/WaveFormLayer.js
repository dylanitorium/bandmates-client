import { connect } from 'react-redux';
import {
  waveformHeightSelector,
  waveformWidthSelector,
  amplitudeSelector,
  waveformSelector,
  waveformOffsetSelector,
} from 'state/selectors';
import WaveFormLayer from '../pure/WaveForm/WaveFormLayer/WaveFormLayer';

const mapStateToProps = state => ({
  data: waveformSelector(state),
  waveformOffset: waveformOffsetSelector(state),
  width: waveformWidthSelector(state),
  height: waveformHeightSelector(state),
  amplitude: amplitudeSelector(state),
});

export default connect(mapStateToProps)(WaveFormLayer);
