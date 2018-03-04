import { connect } from 'react-redux';
import * as interfaceActions from 'state/modules/interface/actions';
import * as sectionsActions from 'state/modules/sections/actions';
import InterfaceLayer from '../pure/WaveForm/InterfaceLayer/InterfaceLayer';
import {
  sectionsForDisplaySelector,
  waveformReferenceStyleSelector,
  waveformContainerStyleSelector,
} from 'state/selectors';

const mapStateToProps = state => ({
  sections: sectionsForDisplaySelector(state),
  waveformReferenceStyle: waveformReferenceStyleSelector(state),
  waveformContainerStyle: waveformContainerStyleSelector(state),
});

const mapDispatchToProps = {
  onInterfaceDrag: interfaceActions.dragToTime,
  onSectionClick: sectionsActions.selectSection,
};

export default connect(mapStateToProps, mapDispatchToProps)(InterfaceLayer);
