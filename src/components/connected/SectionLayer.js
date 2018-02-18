import { connect } from 'react-redux';
import * as constants from 'utils/constants';
import SectionLayer from '../pure/WaveForm/SectionLayer/SectionLayer';


const mapStateToProps = state => ({
  sections: Object.keys(state.sections.sections).map(id => state.sections.sections[id]),
  windowWidth: state.window.width,
  cursorPostion: state.cursor.cursorPostion,
  width: constants.DEFAULT_WAVEFORM_WIDTH,
});


export default connect(mapStateToProps)(SectionLayer);
