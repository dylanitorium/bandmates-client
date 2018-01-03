import * as audio from '../audio';

export const initialState = {
  cursorPostion: 0,
};

const handlers = {
  [audio.actionTypes.UPDATE_TIME]: (state, action) => {
    return {
      cursorPostion: state.waveform.pixels_per_second  * action.currentTime,
    }
  }
}

export default handlers;
