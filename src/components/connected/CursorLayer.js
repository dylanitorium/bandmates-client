import { connect } from 'react-redux';
import CursorLayer from '../pure/WaveForm/CursorLayer/CursorLayer';

const mapStateToProps = state => ({
  windowWidth: state.window.width,
});

export default connect(mapStateToProps)(CursorLayer);
