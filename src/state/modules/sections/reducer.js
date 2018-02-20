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
    default:
      return state;
  }
};

const initialSectionState = {
  id: null,
  start: null,
  end: null,
  comments: {},
};

const section = (state = initialSectionState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case actionTypes.CREATE_SECTION:
      return {
        ...state,
        id: payload.sectionId,
        start: payload.start,
        end: payload.end,
      };
    case actionTypes.UPDATE_COMMENT:
    case actionTypes.DELETE_COMMENT:
    case actionTypes.ADD_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.commentId]: comment(state.comments[payload.commentId], action),
        },
      };
    default:
      return state;
  }
};

const initialState = {
  commentBoxIsOpen: false,
  activeSection: null,
  sections: {},
};

const handlers = {
  [actionTypes.CREATE_SECTION]: (state, action) => ({
    sections: {
      [action.sectionId]: section(state.sections[action.sectionId], action),
    },
    activeSection: action.sectionId,
    commentBoxIsOpen: true,
  }),
  [actionTypes.CLOSE_COMMENT_BOX]: () => ({
    activeSection: null,
    commentBoxIsOpen: false,
  }),
  [actionTypes.ADD_COMMENT]: (state, action) => ({
    sections: {
      [action.sectionId]: section(state.sections[action.sectionId], action),
    },
  }),
}

export default makeReducer(initialState, handlers);
