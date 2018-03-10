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

export const updateCommentThunk = (commentId, value) => (
  (dispatch, getState) => {
    const timestamp = moment();
    dispatch(addComment(commentId, timestamp.format(), value));
  }
);

export const updateComment = (commentId, timestamp, value) => ({
  type: actionTypes.UPDATE_COMMENT,
  commentId,
  timestamp,
  value,
})
