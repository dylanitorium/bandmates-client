import makeReducer from 'utils/makeReducer';
import * as audio from './audio';
import * as waveform from './waveform';

export const initialState = {
  pixelFactor: 0,
  cursorPostion: 0,
};

const handlers = {
  [waveform.actionTypes.REQUEST.SUCCESS]: (state, action) => ({
    pixelFactor: action.waveform.pixels_per_second,
  }),
  [waveform.actionTypes.RESAMPLE]: (state, action) => ({
    pixelFactor: action.waveform.pixels_per_second,
  }),
  [audio.actionTypes.UPDATE_TIME]: (state, action) => ({
      cursorPostion: state.pixelFactor * action.currentTime,
  }),
}

export default makeReducer(initialState, handlers);
