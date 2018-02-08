import { connect } from 'react-redux';
import * as selectionActions from 'state/modules/selection';
import * as sectionsActions from 'state/modules/sections';
import SelectionInterface from '../pure/WaveForm/SelectionLayer/SelectionInterface';


const mapStateToProps = state => ({
  selectorPosition: selectionActions.selectorPositionSelector(state),
});

const mapDispatchToProps = {
  onSelectionStart: selectionActions.startSelectionThunk,
  onSelectionDrag: selectionActions.dragSelector,
  onSelectionEnd: sectionsActions.createSectionThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionInterface);
