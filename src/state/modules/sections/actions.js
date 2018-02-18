import md5 from 'md5';
import { actionTypes } from './actionTypes';

export const createSection = (id, start, end) => ({
  type: actionTypes.CREATE_SECTION,
  id,
  start,
  end,
});

const createId = (start, end) => {
  return `${md5(`${start}${end}`)}.${Date.now()}`;
}

export const createSectionThunk = () => (
  (dispatch, getState) => {
    const { selection: { selectorOffset, selectorStart }, cursor: { cursorPostion } } = getState();
    const id = createId(selectorOffset, selectorStart);
    const end = selectorOffset + cursorPostion;
    dispatch(createSection(id, selectorStart, end));
  }
);

export const closeCommentBox = () => ({
  type: actionTypes.CLOSE_COMMENT_BOX,
});

export const updateComment = (sectionId, value) => ({
  type: actionTypes.UPDATE_COMMENT,
  sectionId,
  value,
});
