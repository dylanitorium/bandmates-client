import { connect } from 'react-redux';
import * as constants from 'utils/constants';
import WaveFormLayer from '../pure/WaveForm/WaveFormLayer/WaveFormLayer';

const mapStateToProps = state => ({
  data: state.waveform.waveform,
  cursorPostion: state.cursor.cursorPostion,
  windowWidth: state.window.width,
  width: constants.DEFAULT_WAVEFORM_WIDTH,
  height: constants.DEFAULT_WAVEFORM_HEIGHT,
  amplitude: constants.DEFAULT_WAVEFORM_AMPLITUDE,
});

export default connect(mapStateToProps)(WaveFormLayer);
