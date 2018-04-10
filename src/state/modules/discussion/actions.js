import { actionTypes } from './actionTypes';

export const setSectionNameEditable = (editable) => ({
  type: actionTypes.SET_EDIT_SECTION_NAME,
  editable
});
