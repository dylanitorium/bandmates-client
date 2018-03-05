import md5 from 'md5';
import moment from 'moment';
import { actionTypes } from './actionTypes';

export const createSection = (sectionId, start, end) => ({
  type: actionTypes.CREATE_SECTION,
  sectionId,
  start,
  end,
});

export const selectSection = sectionId => ({
  type: actionTypes.SELECT_SECTION,
  sectionId,
});

export const deleteSection = sectionId => ({
  type: actionTypes.DELETE_SECTION,
  sectionId,
});

const createSectionId = (start, end) => {
  return `${md5(`${start}${end}`)}.${moment().valueOf()}`;
}

export const createSectionThunk = () => (
  (dispatch, getState) => {
    const { selection: { selectorOffset, selectorStart }, cursor: { cursorPostion } } = getState();
    const id = createSectionId(selectorOffset, selectorStart);
    const end = selectorOffset + cursorPostion;
    dispatch(createSection(id, selectorStart, end));
  }
);

export const closeCommentBox = () => ({
  type: actionTypes.CLOSE_COMMENT_BOX,
});

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
  sectionId,
  author,
});

export const editCommentThunk = (commentId, value) => (
  (dispatch, getState) => {
    const timestamp = moment();
    dispatch(addComment(commentId, timestamp.format(), value));
  }
);

export const editComment = (commentId, timestamp, value) => ({
  type: actionTypes.ADD_COMMENT,
  commentId,
  timestamp,
  value,
})
