import makeReducer from 'utils/makeReducer';
import { createSelector } from 'reselect';
import * as sections from './sections';
import * as waveform from './waveform';

export const windowWidthSelector = state => state.window.width;

export const windowCenterSelector = createSelector(
  windowWidthSelector,
  width => width / 2,
);

export const widthOffsetSelector = createSelector(
  windowWidthSelector,
  width => ((width / 2) - 3)
);

export const offsetSelector = state => state.selection.selectorOffset;

export const cursorPostionSelector = state => state.cursor.cursorPostion;

export const selectorPositionSelector = createSelector(
  widthOffsetSelector,
  offsetSelector,
  (width, offset) => width + offset,
);

export const selectorStartSelector = state => state.selection.selectorStart;

export const selectionRightSelector = createSelector(
  windowCenterSelector,
  cursorPostionSelector,
  selectorStartSelector,
  offsetSelector,
  (center, cursor, start, offset) => (offset > 0 ? center - offset : (center + (cursor - start))),
);

export const selectionLeftSelector = createSelector(
  windowCenterSelector,
  cursorPostionSelector,
  selectorStartSelector,
  offsetSelector,
  (center, cursor, start, offset) => offset > 0 ? (center - (cursor - start)) : center + offset,
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
  isDragging: false,
}

const handlers = {
  [waveform.actionTypes.REQUEST.SUCCESS]: (state, action) => ({
    pixelFactor: action.waveform.pixels_per_second,
  }),
  [actionTypes.START_SELECTION]: (state, action) => ({
    selectorStart: action.selectorStart,
    isDragging: true,
  }),
  [actionTypes.UPDATE_SELECTOR_OFFSET]: (state, action) => ({
    selectorOffset: state.selectorOffset + action.movement,
  }),
  [sections.actionTypes.CREATE_SECTION]: (state, action) => ({
    selectorStart: 0,
    selectorOffset: 0,
    isDragging: false,
  }),
}

export default makeReducer(initialState, handlers);
