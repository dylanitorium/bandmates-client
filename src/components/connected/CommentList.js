import { connect } from 'react-redux';
import CommentList from '../pure/Discussion/CommentList/CommentList';
import * as commentsActions from 'state/modules/comments/actions';
import * as sectionsActions from 'state/modules/sections/actions';
import {
  activeSectionSelector,
  commentsSelector,
  commentValueSelector,
} from 'state/selectors';

const mapStateToProps = state => ({
  section: activeSectionSelector(state),
  comments: commentsSelector(state),
  commentFieldValue: commentValueSelector(state),
});

const mapDispatchToProps = {
  addComment: commentsActions.addCommentThunk,
  updateCommentValue: commentsActions.updateCommentValue,
  deleteSection: sectionsActions.deleteSection,
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
