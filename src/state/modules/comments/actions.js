import md5 from 'md5';
import moment from 'moment';
import { actionTypes } from './actionTypes';

const createCommentId = (timestamp, value, author, sectionId) => {
  return `${md5(`${value}${author}${sectionId}`)}.${timestamp.valueOf()}`;
}

const getAuthorFromSession = () => null;

export const addCommentThunk = (value) => (
  (dispatch, getState) => {
    const { sections: { activeSection: sectionId } } = getState();
    const author = getAuthorFromSession();
    const timestamp = moment();
    const id = createCommentId(timestamp, value, author, sectionId);
    dispatch(addComment(sectionId, id, timestamp.format(), value, author));
  }
);

export const addComment = (sectionId, commentId, timestamp, value, author) => ({
  type: actionTypes.ADD_COMMENT,
  commentId,
  sectionId,
  author,
  timestamp,
  value,
});

export const editCommentThunk = (commentId, value) => (
  (dispatch, getState) => {
    const timestamp = moment();
    dispatch(editComment(commentId, timestamp.format(), value));
  }
);

export const editComment = (commentId, timestamp, value) => ({
  type: actionTypes.EDIT_COMMENT,
  commentId,
  timestamp,
  value,
});

export const deleteComment = commentId => ({
  type: actionTypes.DELETE_COMMENT,
  commentId,
});

export const selectComment = commentId => ({
  type: actionTypes.SELECT_COMMENT,
  commentId,
});

export const updateCommentValue = value => ({
  type: actionTypes.UPDATE_COMMENT,
  value,
});
