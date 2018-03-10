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
  comments: [],
};

const handlers = {
  [actionTypes.ADD_COMMENT]: (state, action) => ({
    comments: [
      ...state.comments,
      comment(null, action)
    ],
  }),
  [actionTypes.EDIT_COMMENT]: (state, action) => ({
    comments: [
      ...state.comments.filter(({ commentId }) => commentId !== action.commentId),
      comment(state.comments.find(({ commentId }) => commentId === action.commentId), action)
    ],
  }),
  [actionTypes.SELECT_COMMENT]: (state, action) => ({
    activeComment: action.commentId,
  }),
  [actionTypes.UNSELECT_COMMENT]: (state, action) => ({
    activeComment: null,
  }),
  [actionTypes.DELETE_COMMENT]: (state, action) => ({
    comments: state.comments.filter(({ commentId }) => commentId !== action.commentId),
  }),
}

export default makeReducer(initialState, handlers);
