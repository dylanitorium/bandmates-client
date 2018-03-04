import { connect } from 'react-redux';
import SectionLayer from '../pure/WaveForm/SectionLayer/SectionLayer';
import {
  waveformContainerStyleSelector,
  waveformReferenceStyleSelector,
  sectionsForDisplaySelector
} from 'state/selectors';

const mapStateToProps = state => ({
  sections: sectionsForDisplaySelector(state),
  waveformReferenceStyle: waveformReferenceStyleSelector(state),
  waveformContainerStyle: waveformContainerStyleSelector(state),
});


export default connect(mapStateToProps)(SectionLayer);
