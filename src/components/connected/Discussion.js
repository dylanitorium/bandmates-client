import { connect } from 'react-redux';
import Discussion from '../pure/Discussion';
import {
  sectionsForDiscussionSelector
} from 'state/selectors';

const mapStateToProps = state => ({
  sections: sectionsForDiscussionSelector(state),
});

export default connect(mapStateToProps)(Discussion);
