import { connect } from 'react-redux';
import * as constants from 'utils/constants';
import SectionLayer from '../pure/WaveForm/SectionLayer/SectionLayer';
import {
  waveformContainerStyleSelector,
  waveformReferenceStyleSelector,
  sectionsForDisplaySelector
} from 'state/modules/selectors';



const mapStateToProps = state => ({
  sections: sectionsForDisplaySelector(state),
  waveformReferenceStyle: waveformReferenceStyleSelector(state),
  waveformContainerStyle: waveformContainerStyleSelector(state),
});


export default connect(mapStateToProps)(SectionLayer);
