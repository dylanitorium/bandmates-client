import { connect } from 'react-redux';
import * as selectionActions from 'state/modules/selection/actions';
import * as sectionsActions from 'state/modules/sections/actions';
import SelectionInterface from '../pure/WaveForm/SelectionLayer/SelectionInterface';
import {
 selectorPositionSelector,
 windowWidthSelector
} from 'state/selectors';

const mapStateToProps = state => ({
  selectorPosition: selectorPositionSelector(state),
  windowWidth: windowWidthSelector(state),
});

const mapDispatchToProps = {
  onSelectionStart: selectionActions.startSelectionThunk,
  onSelectionDrag: selectionActions.dragSelector,
  onSelectionEnd: sectionsActions.createSectionThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionInterface);
