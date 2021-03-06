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

export const deselectSection = () => ({
  type: actionTypes.DESELECT_SECTION
});

export const deleteSection = sectionId => ({
  type: actionTypes.DELETE_SECTION,
  sectionId,
});


export const editSectionStart = (sectionId, movement) => ({
  type: actionTypes.EDIT_SECTION_START,
  sectionId,
  movement,
});

export const editSectionEnd = (sectionId, movement) => ({
  type: actionTypes.EDIT_SECTION_END,
  sectionId,
  movement,
});

export const renameSection = (sectionId, name) => ({
  type: actionTypes.RENAME_SECTION,
  sectionId,
  name,
});

const createSectionId = (start, end) => {
  return `${md5(`${start}${end}`)}.${moment().valueOf()}`;
}

export const createSectionThunk = cursorPostion => (
  (dispatch, getState) => {
    const { selection: { selectorOffset, selectorStart } } = getState();
    const id = createSectionId(selectorOffset, selectorStart);
    const end = selectorOffset + cursorPostion;
    dispatch(createSection(id, selectorStart, end));
  }
);
