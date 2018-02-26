import makeReducer from 'utils/makeReducer';
import { actionTypes } from './actionTypes';
import * as constants from 'utils/constants';

const initialState = {
  waveform: null,
  isRequesting: false,
  error: null,
  height: constants.DEFAULT_WAVEFORM_HEIGHT,
  amplitude: constants.DEFAULT_WAVEFORM_AMPLITUDE,
  width: constants.DEFAULT_WAVEFORM_WIDTH,
};

const handlers = {
  [actionTypes.REQUEST.START]: () => ({
    isRequesting: true,
  }),
  [actionTypes.REQUEST.SUCCESS]: (state, action) => ({
    isRequesting: false,
    waveform: action.waveform,
  }),
  [actionTypes.REQUEST.FINISH]: (state, action) => ({
    isRequesting: false,
    error: action.error,
  }),
  [actionTypes.RESAMPLE]: (state, action) => ({
    waveform: action.waveform,
  }),
};


export default makeReducer(initialState, handlers);
