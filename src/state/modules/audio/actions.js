import BasicAudioFile from 'utils/BasicAudioFile';
import * as timeUtils from 'utils/time';
import { actionTypes } from './actionTypes';

// Action Creators
export const requestAudioStart = () => ({
  type: actionTypes.REQUEST.START,
});

export const requestAudioSuccess = audio => ({
  type: actionTypes.REQUEST.SUCCESS,
  audio,
});

export const requestAudioFailure = error => ({
  type: actionTypes.REQUEST.FAILURE,
  error,
})

export const play = (currentTime, timestamp) => ({
  type: actionTypes.PLAY,
  currentTime,
  timestamp,
});

export const pause = () => ({
  type: actionTypes.PAUSE,
});

export const stop = () => ({
  type: actionTypes.STOP,
});

export const updateTime = (currentTime, timestamp) => ({
  type: actionTypes.UPDATE_TIME,
  currentTime,
  timestamp,
});


// Thunk Actions
export const requestAudio = source => (
  async (dispatch, getState) => {
    dispatch(requestAudioStart());

    const audio = new BasicAudioFile(source);

    try {
      await audio.init();
      dispatch(requestAudioSuccess(audio));
    } catch (error) {
      dispatch(requestAudioFailure(error));
    }
  }
);

export const updateTimeThunk = () => (
  (dispatch, getState) => {
    const { audio: { audio, isPlaying, currentTime, timestamp } } = getState();
    timeUtils.clearAllTimeouts();

    if (!isPlaying) {
      return;
    }

    if (currentTime >= audio.getDuration()) {
      dispatch(stop());
      return;
    }

    const elapsed = currentTime + ((timeUtils.getTimestamp() - timestamp) / 1000);
    dispatch(updateTime(elapsed, timeUtils.getTimestamp()));

    setTimeout(() => {
      dispatch(updateTimeThunk());
    }, 10);
  }
)

export const playThunk = offset => (
  (dispatch, getState) => {
    const { audio: { audio, currentTime } } = getState();

    const start = offset || currentTime;
    audio.play(start);
    dispatch(play(start, timeUtils.getTimestamp()));
    dispatch(updateTimeThunk());
  }
);

export const pauseThunk = () => (
  (dispatch, getState) => {
    const { audio: { audio } } = getState();
    audio.stop();
    dispatch(pause());
  }
);
