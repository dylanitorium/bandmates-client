import makeReducer from 'utils/makeReducer';
import { actionTypes } from './actionTypes';

const initialSectionState = {
  id: null,
  start: null,
  end: null,
  comments: [],
};

const section = (state = initialSectionState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case actionTypes.CREATE_SECTION:
      return {
        ...state,
        id: payload.id,
        start: payload.start,
        end: payload.end,
      };
    case actionTypes.UPDATE_COMMENT:
      return {
        ...state,
        comment: payload.value,
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
      [action.id]: section(state.sections[action.id], action),
    },
    activeSection: action.id,
    commentBoxIsOpen: true,
  }),
  [actionTypes.CLOSE_COMMENT_BOX]: () => ({
    activeSection: null,
    commentBoxIsOpen: false,
  }),
  [actionTypes.UPDATE_COMMENT]: (state, action) => ({
    sections: {
      [action.sectionId]: section(state.sections[action.sectionId], action),
    },
  }),
}

export default makeReducer(initialState, handlers);
