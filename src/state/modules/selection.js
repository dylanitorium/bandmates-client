import makeReducer from 'utils/makeReducer';
import { createSelector } from 'reselect';
import * as sections from './sections';

export const windowWidthSelector = state => state.window.width;

export const offsetSelector = state => state.selection.selectorOffset

export const selectorPositionSelector = createSelector(
  windowWidthSelector,
  offsetSelector,
  (width, offset) => ((width / 2) - 3) + offset,
);

export const selectorStartSelector = state => state.selection.selectorStart;


export const selectorOffsetSelector = createSelector(
  windowWidthSelector,
  selectorStartSelector,
  (width, start) => ((width / 2) - 3) + start,
);

export const actionTypes = {
  START_SELECTION: 'app/selection/start',
  UPDATE_SELECTOR_OFFSET: 'app/selection/update',
};

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


const initialState = {
  selectorStart: 0,
  selectorOffset: 0,
}

const handlers = {
  [actionTypes.START_SELECTION]: (state, action) => ({
    selectorStart: action.selectorStart,
  }),
  [actionTypes.UPDATE_SELECTOR_OFFSET]: (state, action) => ({
    selectorOffset: state.selectorOffset + action.movement,
  }),
  [sections.actionTypes.CREATE_SECTION]: (state, action) => ({
    selectorStart: 0,
    selectorOffset: 0,
  }),
}

export default makeReducer(initialState, handlers);
