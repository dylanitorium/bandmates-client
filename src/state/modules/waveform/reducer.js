import makeReducer from 'utils/makeReducer';
import { actionTypes } from './actionTypes';

const initialState = {
  waveform: null,
  isRequesting: false,
  error: null,
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
