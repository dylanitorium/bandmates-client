import makeReducer from 'utils/makeReducer';
import { actionTypes } from './actionTypes';

const initialCommentState = {
  author: null,
  id: null,
  lastEdited: null,
  edited: false,
  content: '',
};

const comment = (state = initialCommentState, action) => {
  const { type, ...payload } = action;
  switch(type) {
    case actionTypes.ADD_COMMENT:
      return {
        ...state,
        id: payload.commentId,
        content: payload.value,
        lastEdited: payload.timestamp,
        author: payload.author,
        sectionId: payload.sectionId,
      }
    case actionTypes.EDIT_COMMENT:
      return {
        ...state,
        content: payload.value,
        lastEdited: payload.timestamp,
      }
    default:
      return state;
  }
};

const initialState = {
  activeComment: null,
  commentFieldValue: '',
  comments: [],
};

const handlers = {
  [actionTypes.ADD_COMMENT]: (state, action) => ({
    activeComment: null, 
    commentFieldValue: '',
    comments: [
      ...state.comments,
      comment(null, action)
    ],
  }),
  [actionTypes.EDIT_COMMENT]: (state, action) => ({
    activeComment: null,
    commentFieldValue: '',
    comments: [
      ...state.comments.filter(({ id }) => id !== action.commentId),
      comment(state.comments.find(({ id }) => id === action.commentId), action)
    ],
  }),
  [actionTypes.SELECT_COMMENT]: (state, action) => ({
    commentFieldValue: state.comments.find(({ id }) => id === action.commentId).content,
    activeComment: action.commentId,
  }),
  [actionTypes.UNSELECT_COMMENT]: (state, action) => ({
    commentFieldValue: '',
    activeComment: null,
  }),
  [actionTypes.DELETE_COMMENT]: (state, action) => ({
    comments: state.comments.filter(({ id }) => id !== action.commentId),
  }),
  [actionTypes.UPDATE_COMMENT]: (state, action) => ({
    commentFieldValue: action.value
  }),
}

export default makeReducer(initialState, handlers);
