import { connect } from 'react-redux';
import Discussion from '../pure/Discussion';
import * as sectionsActions from 'state/modules/sections/actions';
import {
  sectionsForDiscussionSelector
} from 'state/selectors';

const mapStateToProps = state => ({
  sections: sectionsForDiscussionSelector(state),
});

const mapDispatchToProps = {
  onSectionClick: sectionsActions.selectSection
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);
