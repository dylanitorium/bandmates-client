import * as audioActions from './audio';

const clearAllTimeouts = () => {
  let id = setTimeout(null,0);
  while (id--) {
    clearTimeout(id);
  }
}


// Thunk
export const jumpToTime = (offset) => (
  (dispatch, getState) => {
    const { audio: { audio }, waveform: { waveform }, window: { width }, cursor: { cursorPostion } } = getState();

    if (!audio) {
      return;
    }

    clearAllTimeouts();

    const timeOffset = waveform.seconds_per_pixel * ((offset + cursorPostion) - (width / 2));

    dispatch(audioActions.playThunk(timeOffset));
  }
);

export const dragToTime = (movement) => (
  (dispatch, getState) => {
    const { audio: { audio }, waveform: { waveform }, cursor: { cursorPostion } } = getState();

    if (!audio) {
      return;
    }

    clearAllTimeouts();

    const offset = cursorPostion + (movement * -1);
    const timeOffset = waveform.seconds_per_pixel * (offset < 0) ? 0 : offset;

    dispatch(audioActions.playThunk(timeOffset));
  }
);

export const registerKeyboardEvents = () => (
  (dispatch, getState) => {
    window.addEventListener('keypress', (event) => {
      const { audio: { audio, isPlaying, currentTime } } = getState();

      if (event.keyCode === 32) {
        if (!audio) {
          return;
        }

        if (isPlaying) {
          dispatch(audioActions.pauseThunk());
        } else {
          dispatch(audioActions.playThunk(currentTime));
        }
      }
    });
  }
)
