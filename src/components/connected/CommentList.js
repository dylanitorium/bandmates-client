import { connect } from 'react-redux';
import CommentList from '../pure/Discussion/CommentList/CommentList';
import * as commentsActions from 'state/modules/comments/actions';
import * as sectionsActions from 'state/modules/sections/actions';
import * as discussionActions from 'state/modules/discussion/actions';
import {
  activeSectionSelector,
  commentsSelector,
  commentValueSelector,
  isSectionNameEditableSelector,
} from 'state/selectors';

const mapStateToProps = state => ({
  section: activeSectionSelector(state),
  comments: commentsSelector(state),
  commentFieldValue: commentValueSelector(state),
  isSectionNameEditable: isSectionNameEditableSelector(state)
});

const mapDispatchToProps = {
  addComment: commentsActions.addCommentThunk,
  updateCommentValue: commentsActions.updateCommentValue,
  deleteSection: sectionsActions.deleteSection,
  clearActiveSection: sectionsActions.deselectSection,
  setSectionNameEditable: discussionActions.setSectionNameEditable,
  editSectionName: sectionsActions.renameSection
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
