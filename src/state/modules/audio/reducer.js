import makeReducer from 'utils/makeReducer';
import { actionTypes } from './actionTypes';

// Reducer
const initialState = {
  isRequesting: false,
  audio: null,
  isPlaying: false,
  currentTime: 0,
  error: null,
  timestamp: 0,
};

const handlers = {
  [actionTypes.REQUEST.START]: () => ({
    isRequesting: true,
    isPlaying: false,
  }),
  [actionTypes.REQUEST.SUCCESS]: (state, action) => ({
    isRequesting: false,
    audio: action.audio,
    error: null,
  }),
  [actionTypes.REQUEST.FAILURE]: (state, action) => ({
    isRequesting: false,
    error: action.error,
  }),
  [actionTypes.PLAY]: (state, action) => ({
    isPlaying: true,
    currentTime: action.currentTime,
    timestamp: action.timestamp,
  }),
  [actionTypes.PAUSE]: () => ({
    isPlaying: false,
    timestamp: 0,
  }),
  [actionTypes.STOP]: () => ({
    isPlaying: false,
    currentTime: 0,
    timestamp: 0,
  }),
  [actionTypes.UPDATE_TIME]: (state, action) => ({
    currentTime: action.currentTime,
    timestamp: action.timestamp,
  }),
};

export default makeReducer(initialState, handlers);
