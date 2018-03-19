import { connect } from 'react-redux';
import * as interfaceActions from 'state/modules/interface/actions';
import * as selectionActions from 'state/modules/selection/actions';
import * as sectionsActions from 'state/modules/sections/actions';
import InterfaceLayer from '../pure/WaveForm/InterfaceLayer/InterfaceLayer';
import {
  sectionsForDisplaySelector,
  waveformReferenceStyleSelector,
  waveformContainerStyleSelector,
  selectorPositionSelector,
  windowWidthSelector,
  widthOffsetSelector
} from 'state/selectors';

const mapStateToProps = state => ({
  sections: sectionsForDisplaySelector(state),
  waveformReferenceStyle: waveformReferenceStyleSelector(state),
  waveformContainerStyle: waveformContainerStyleSelector(state),
  selectorPosition: selectorPositionSelector(state),
  windowWidth: windowWidthSelector(state),
  widthOffset: widthOffsetSelector(state),
});

const mapDispatchToProps = {
  onInterfaceDrag: interfaceActions.dragToTime,
  onSectionClick: sectionsActions.selectSection,
  onSelectionStart: selectionActions.startSelectionThunk,
  onSelectionDrag: selectionActions.dragSelector,
  onSelectionEnd: sectionsActions.createSectionThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(InterfaceLayer);
