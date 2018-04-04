import { actionTypes } from './actionTypes';

export const startSelection = (selectorStart) => ({
  type: actionTypes.START_SELECTION,
  selectorStart,
});

export const startSelectionThunk = cursorPosition => (
  (dispatch, getState) => {
    dispatch(startSelection(cursorPosition));
  }
);

export const dragSelector = (movement) => ({
  type: actionTypes.UPDATE_SELECTOR_OFFSET,
  movement,
});
