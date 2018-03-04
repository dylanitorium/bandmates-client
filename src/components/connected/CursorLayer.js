import { connect } from 'react-redux';
import CursorLayer from '../pure/WaveForm/CursorLayer/CursorLayer';
import { windowWidthSelector } from 'state/selectors';

const mapStateToProps = state => ({
  windowWidth: windowWidthSelector(state),
});

export default connect(mapStateToProps)(CursorLayer);
