import { connect } from 'react-redux';
import * as selectionSelectors from 'state/modules/selection/selectors';
import SelectionLayer from '../pure/WaveForm/SelectionLayer/SelectionLayer';

const mapStateToProps = state => ({
  selectionLeft: selectionSelectors.selectionLeftSelector(state),
  selectionRight: selectionSelectors.selectionRightSelector(state),
  isDragging: state.selection.isDragging,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionLayer);
