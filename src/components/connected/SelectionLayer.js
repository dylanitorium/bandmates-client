import { connect } from 'react-redux';
import SelectionLayer from '../pure/WaveForm/SelectionLayer/SelectionLayer';
import {
  selectionLeftSelector,
  selectionRightSelector,
  selectionIsDraggingSelector,
} from 'state/selectors';

const mapStateToProps = state => ({
  selectionLeft: selectionLeftSelector(state),
  selectionRight: selectionRightSelector(state),
  isDragging: selectionIsDraggingSelector(state),
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionLayer);
