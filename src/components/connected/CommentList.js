import { connect } from 'react-redux';
import CommentList from '../pure/Discussion/CommentList/CommentList';
import * as commentsActions from 'state/modules/comments/actions';
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
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
