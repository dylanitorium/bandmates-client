import { connect } from 'react-redux';
import SelectionLayer from '../pure/WaveForm/SelectionLayer/SelectionLayer';

const mapStateToProps = state => ({
  windowWidth: state.window.width,
  selectorPosition: state.selection.selectorOffset,
  cursorPosition: state.cursor.cursorPostion,
  selectorStart: state.selection.selectorStart,
  isDragging: state.selection.isDragging,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionLayer);
