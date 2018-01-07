import * as audioActions from './audio';
import * as timeUtils from 'utils/time';

// Thunk
export const playToggle = (event) => (
  (dispatch, getState) => {
    const { audio: { audio, isPlaying } } = getState();

    if (!audio) {
      return;
    }

    if (isPlaying) {

      dispatch(audioActions.pauseThunk());
    } else {
      dispatch(audioActions.playThunk());
    }
  }
);

const setNewOffset = (offset) => (
  (dispatch, getState) => {
    const { audio: { isPlaying } } = getState();

    const positiveOffset = offset > 0 ? offset : 0;

    if (isPlaying) {
      dispatch(audioActions.playThunk(positiveOffset));
    } else {
      dispatch(audioActions.updateTime(positiveOffset, timeUtils.getTimestamp()));
    }
  }
);

export const jumpToTime = (offset) => (
  (dispatch, getState) => {
    const {
      waveform: { waveform },
      window: { width },
      cursor: { cursorPostion },
    } = getState();

    const timeOffset = waveform.seconds_per_pixel * ((offset + cursorPostion) - (width / 2));

    dispatch(setNewOffset(timeOffset));
  }
);

export const dragToTime = (offset) => (
  (dispatch, getState) => {
    const {
      waveform: { waveform },
      window: { width },
    } = getState();

    const timeOffset = (waveform.seconds_per_pixel * (offset - (width / 2)) * -1);

    dispatch(setNewOffset(timeOffset));
  }
);

export const registerKeyboardEvents = () => (
  (dispatch, getState) => {
    window.addEventListener('keyup', (event) => {
      const { audio: { audio, isPlaying } } = getState();

      if (event.keyCode === 32) {
        if (!audio) {
          return;
        }

        if (isPlaying) {
          dispatch(audioActions.pauseThunk());
        } else {
          dispatch(audioActions.playThunk());
        }
      }
    });
  }
)
