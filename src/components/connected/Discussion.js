import { connect } from 'react-redux';
import Discussion from '../pure/Discussion/Discussion';
import {
  activeSectionSelector,
} from 'state/selectors';

const mapStateToProps = state => ({
  activeSection: activeSectionSelector(state),
});

export default connect(mapStateToProps)(Discussion);
