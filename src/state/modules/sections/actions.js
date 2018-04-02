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

export const deleteSection = sectionId => ({
  type: actionTypes.DELETE_SECTION,
  sectionId,
});


export const editSectionStart = (sectionId, movement) => ({
  type: actionTypes.EDIT_SECTION_START,
  sectionId,
  movement,
})
export const editSectionEnd = (sectionId, movement) => ({
  type: actionTypes.EDIT_SECTION_END,
  sectionId,
  movement,
})

const createSectionId = (start, end) => {
  return `${md5(`${start}${end}`)}.${moment().valueOf()}`;
}

export const createSectionThunk = () => (
  (dispatch, getState) => {
    const { selection: { selectorOffset, selectorStart }, cursor: { cursorPostion } } = getState();
    const id = createSectionId(selectorOffset, selectorStart);
    const end = selectorOffset + cursorPostion;
    dispatch(createSection(id, selectorStart, end));
  }
);
