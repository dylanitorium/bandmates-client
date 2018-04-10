import * as audioActions from '../audio/actions';
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

export const dragToTime = (movement, start) => (
  (dispatch, getState) => {
    const {
      waveform: { waveform },
      audio: { currentTime },
    } = getState();

    const timeMovement = movement * waveform.seconds_per_pixel;
    const inverseTimeMovement = timeMovement * -1;
    const timeOffset = inverseTimeMovement + currentTime;

    dispatch(setNewOffset(timeOffset));
  }
);

const INPUT_NODES = [
  'TEXTAREA',
  'INPUT'
]

export const registerKeyboardEvents = () => (
  (dispatch, getState) => {
    window.addEventListener('keyup', (event) => {
      const { audio: { audio, isPlaying } } = getState();
      const focused = document.activeElement;

      // If we are focused on the comment box, then don't do anything with the key press
      if (focused && INPUT_NODES.includes(focused.nodeName)) {
        return;
      }

      if (!audio) {
        return;
      }

      if (event.keyCode === 32) {


        if (isPlaying) {
          dispatch(audioActions.pauseThunk());
        } else {
          dispatch(audioActions.playThunk());
        }
      }
    });
  }
);
