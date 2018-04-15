import makeReducer from 'utils/makeReducer';
import { actionTypes } from './actionTypes';
import { actionTypes as sectionsActionTypes } from '../sections/actionTypes';

const initialState = {
  isSectionNameEditable: false,
};

const handlers = {
  [actionTypes.SET_EDIT_SECTION_NAME]: (state, action) => ({
    isSectionNameEditable: action.editable,
  }),
  [sectionsActionTypes.DESELECT_SECTION]: () => ({
    isSectionNameEditable: false,
  }),
  [sectionsActionTypes.CREATE_SECTION]: () => ({
    isSectionNameEditable: false,
  }),
}

export default makeReducer(initialState, handlers);
