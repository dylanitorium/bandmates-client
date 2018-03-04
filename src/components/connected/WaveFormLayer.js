import { connect } from 'react-redux';
import * as constants from 'utils/constants';
import {
  waveformHeightSelector,
  waveformWidthSelector,
  amplitudeSelector,
  waveformSelector,
  cursorPositionSelector,
  windowWidthSelector,
} from 'state/selectors';
import WaveFormLayer from '../pure/WaveForm/WaveFormLayer/WaveFormLayer';

const mapStateToProps = state => ({
  data: waveformSelector(state),
  cursorPostion: cursorPositionSelector(state),
  windowWidth: windowWidthSelector(state),
  width: waveformWidthSelector(state),
  height: waveformHeightSelector(state),
  amplitude: amplitudeSelector(state),
});

export default connect(mapStateToProps)(WaveFormLayer);
