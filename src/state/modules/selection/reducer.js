import makeReducer from 'utils/makeReducer';
import { actionTypes } from './actionTypes';

import * as sections from '../sections/actionTypes';

const initialState = {
  selectorStart: 0,
  selectorOffset: 0,
  isDragging: false,
}

const handlers = {
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
