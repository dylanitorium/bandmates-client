import { compose } from 'redux';
import { connect } from 'react-redux';
import conditionalComponent from 'hoc/conditionalComponent';
import SectionDetailsInterface from 'components/pure/WaveForm/SectionDetailsInterface/SectionDetailsInterface';
import * as sectionsActions from 'state/modules/sections/actions';
import * as commentActions from 'state/modules/comments/actions';
import {
  commentBoxVisibleSelector,
  activeSectionSelector,
  commentsSelector,
  commentValueSelector,
  activeCommentIdSelector,
} from 'state/selectors';

const mapStateToProps = state => ({
  visible: commentBoxVisibleSelector(state),
  section: activeSectionSelector(state),
  comments: commentsSelector(state),
  commentValue: commentValueSelector(state),
  activeCommentId: activeCommentIdSelector(state),
});

const mapDispatchToProps = {
  closeCommentBox: sectionsActions.closeCommentBox,
  addComment: commentActions.addCommentThunk,
  editComment: commentActions.editCommentThunk,
  selectComment: commentActions.selectComment,
  updateCommentValue: commentActions.updateCommentValue,
  deleteComment: commentActions.deleteComment,
  deleteSection: sectionsActions.deleteSection,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  conditionalComponent,
)(SectionDetailsInterface);
