import makeReducer from 'utils/makeReducer';
import { actionTypes } from './actionTypes';

const initialSectionState = {
  id: null,
  start: null,
  end: null,
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
    default:
      return state;
  }
};

const initialState = {
  activeSection: null,
  sections: [],
};

const handlers = {
  [actionTypes.SELECT_SECTION]: (state, action) => ({
    activeSection: action.sectionId,
  }),
  [actionTypes.DELETE_SECTION]: (state, action) => ({
    activeSection: null,
    sections: state.sections.filter(({ id }) => id !== action.sectionId),
  }),
  [actionTypes.CREATE_SECTION]: (state, action) => ({
    sections: [
      ...state.sections,
      section(null, action),
    ],
    activeSection: action.sectionId,
  }),
  [actionTypes.CLOSE_COMMENT_BOX]: () => ({
    activeSection: null,
  }),
}

export default makeReducer(initialState, handlers);
