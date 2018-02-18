import { actionTypes } from './actionTypes';

export const startSelection = (selectorStart) => ({
  type: actionTypes.START_SELECTION,
  selectorStart,
});

export const startSelectionThunk = () => (
  (dispatch, getState) => {
    const { cursor: { cursorPostion } } = getState();
    dispatch(startSelection(cursorPostion));
  }
);

export const dragSelector = (movement) => ({
  type: actionTypes.UPDATE_SELECTOR_OFFSET,
  movement,
});
