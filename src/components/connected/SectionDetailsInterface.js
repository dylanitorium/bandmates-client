import { compose } from 'redux';
import { connect } from 'react-redux';
import conditionalComponent from 'hoc/conditionalComponent';
import SectionDetailsInterface from 'components/pure/WaveForm/SectionDetailsInterface/SectionDetailsInterface';
import * as sectionsActions from 'state/modules/sections/actions';
import {
  commentBoxVisibleSelector,
  activeSectionSelector,
  commentsSelector,
} from 'state/selectors';

const mapStateToProps = state => ({
  visible: commentBoxVisibleSelector(state),
  section: activeSectionSelector(state),
  comments: commentsSelector(state),
});

const mapDispatchToProps = {
  closeCommentBox: sectionsActions.closeCommentBox,
  addComment: sectionsActions.addCommentThunk,
  deleteSection: sectionsActions.deleteSection,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  conditionalComponent,
)(SectionDetailsInterface);
