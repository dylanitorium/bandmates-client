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

    case actionTypes.DELETE_COMMENT:
      return {
        ...state,
        comments: (() => {
          const { [action.commentId]: comment, ...comments } = state.comments;
          return comments;
        })
      }
    case actionTypes.UPDATE_COMMENT:
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
  [actionTypes.SELECT_SECTION]: (state, action) => ({
    activeSection: action.sectionId,
    commentBoxIsOpen: true,
  }),
  [actionTypes.DELETE_SECTION]: (state, action) => ({
    activeSection: null,
    commentBoxIsOpen: false,
    sections: (() => {
      const { [action.sectionId]: section, ...sections } = state.sections;
      return sections;
    })
  }),
  [actionTypes.CREATE_SECTION]: (state, action) => ({
    sections: {
      ...state.sections,
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
      ...state.sections,
      [action.sectionId]: section(state.sections[action.sectionId], action),
    },
  }),
}

export default makeReducer(initialState, handlers);
