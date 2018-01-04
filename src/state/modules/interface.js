import * as audioActions from './audio';

const clearAllTimeouts = () => {
  let id = setTimeout(null,0);
  while (id--) {
    clearTimeout(id);
  }
}

const getTimestamp = () => {
  const date = new Date();
  return date.getTime();
}


// Thunk
export const jumpToTime = (offset) => (
  (dispatch, getState) => {
    const {
      audio: { audio, isPlaying },
      waveform: { waveform },
      window: { width },
      cursor: { cursorPostion },
    } = getState();

    clearAllTimeouts();

    const timeOffset = waveform.seconds_per_pixel * ((offset + cursorPostion) - (width / 2));

    if (isPlaying) {
      dispatch(audioActions.playThunk(timeOffset));
    } else {
      dispatch(audioActions.updateTime(timeOffset, getTimestamp()));
    }
  }
);

export const dragToTime = (offset) => (
  (dispatch, getState) => {
    const {
      audio: { audio, isPlaying },
      waveform: { waveform },
      window: { width },
    } = getState();

    clearAllTimeouts();

    const timeOffset = waveform.seconds_per_pixel * (offset - (width / 2)) * -1;

    if (isPlaying) {
      dispatch(audioActions.playThunk(timeOffset));
    } else {
      dispatch(audioActions.updateTime(timeOffset, getTimestamp()));
    }
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
