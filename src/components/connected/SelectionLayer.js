import { connect } from 'react-redux';
import SelectionLayer from '../pure/WaveForm/SelectionLayer/SelectionLayer';

const mapStateToProps = state => ({
  windowWidth: state.window.width,
  selectorPosition: state.selection.selectorOffset,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionLayer);
