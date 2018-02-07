import makeReducer from 'utils/makeReducer';
import { createSelector } from 'reselect';
import * as sections from './sections';
import * as audio from './audio';
import * as waveform from './waveform';

export const windowWidthSelector = state => state.window.width;

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
  [waveform.actionTypes.REQUEST.SUCCESS]: (state, action) => ({
    pixelFactor: action.waveform.pixels_per_second,
  }),
  [actionTypes.START_SELECTION]: (state, action) => ({
    selectorStart: action.selectorStart,
  }),
  [audio.actionTypes.UPDATE_TIME]: (state, action) => ({
    selectorStart: state.pixelFactor * action.currentTime,
  }),
  [actionTypes.UPDATE_SELECTOR_OFFSET]: (state, action) => ({
    selectorOffset: state.selectorOffset + action.movement,
  }),
  [sections.actionTypes.CREATE_SECTION]: (state, action) => ({
    selectorOffset: 0,
  }),
}

export default makeReducer(initialState, handlers);
