import { connect } from 'react-redux';
import * as selectionActions from 'state/modules/selection';
import SelectionLayer from '../pure/WaveForm/SelectionLayer/SelectionLayer';

const mapStateToProps = state => ({
  selectionLeft: selectionActions.selectionLeftSelector(state),
  selectionRight: selectionActions.selectionRightSelector(state),
  isDragging: state.selection.isDragging,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionLayer);
