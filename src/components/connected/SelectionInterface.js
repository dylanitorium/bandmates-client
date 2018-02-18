import { connect } from 'react-redux';
import * as selectionActions from 'state/modules/selection/actions';
import * as selectionSelectors from 'state/modules/selection/selectors';
import * as sectionsActions from 'state/modules/sections/actions';
import SelectionInterface from '../pure/WaveForm/SelectionLayer/SelectionInterface';


const mapStateToProps = state => ({
  selectorPosition: selectionSelectors.selectorPositionSelector(state),
  windowWidth: state.window.width,
});

const mapDispatchToProps = {
  onSelectionStart: selectionActions.startSelectionThunk,
  onSelectionDrag: selectionActions.dragSelector,
  onSelectionEnd: sectionsActions.createSectionThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionInterface);
