import makeReducer from 'utils/makeReducer';
import { actionTypes } from './actionTypes';

import * as sections from '../sections/actionTypes';
import * as waveform from '../waveform/actionTypes';

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
