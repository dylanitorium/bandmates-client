import makeReducer from 'utils/makeReducer';
import { actionTypes } from './actionTypes';

const initialSectionState = {
  id: null,
  name: null,
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
        name: payload.sectionId,
        start: payload.start,
        end: payload.end,
      }
    case actionTypes.RENAME_SECTION:
      return {
        ...state,
        name: payload.name,
      };
    case actionTypes.EDIT_SECTION_START:
      return {
        ...state,
        start: state.start + payload.movement
      };
    case actionTypes.EDIT_SECTION_END:
      return {
        ...state,
        end: state.end + payload.movement
      };
    default:
      return state;
  }
};

const initialState = {
  activeSection: null,
  sectionControlOffset: 0,
  sections: [],
};

const sectionPassThrough = (state, action) => ({
  sections: [
    ...state.sections.filter(({ id }) => id !== action.sectionId),
    section(state.sections.find(({ id }) => id === action.sectionId), action)
  ]
});

const handlers = {
  [actionTypes.SELECT_SECTION]: (state, action) => ({
    activeSection: action.sectionId,
  }),
  [actionTypes.EDIT_SECTION_START]: sectionPassThrough,
  [actionTypes.EDIT_SECTION_END]: sectionPassThrough,
  [actionTypes.RENAME_SECTION]: sectionPassThrough,
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
  [actionTypes.DESELECT_SECTION]: (state, action) => ({
    activeSection: null,
  }),
}

export default makeReducer(initialState, handlers);
