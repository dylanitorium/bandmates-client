import { connect } from 'react-redux';
import SectionList from '../pure/Discussion/SectionList/SectionList';
import * as sectionsActions from 'state/modules/sections/actions';
import {
  sectionsForDiscussionSelector,
} from 'state/selectors';

const mapStateToProps = state => ({
  sections: sectionsForDiscussionSelector(state),
});

const mapDispatchToProps = {
  onSectionClick: sectionsActions.selectSection
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionList);
