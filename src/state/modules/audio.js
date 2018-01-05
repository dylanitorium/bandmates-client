import BasicAudioFile from 'utils/BasicAudioFile';
import makeReducer from 'utils/makeReducer';
import * as timeUtils from 'utils/time';

// Config
const audioConfig = {
  UPDATE_INTERVAL: 50,
}

// Action Types
export const actionTypes = {
  REQUEST: {
    START: 'app/audio/request/start',
    SUCCESS: 'app/audio/request/success',
    FAILURE: 'app/audio/request/failure',
  },
  PLAY: 'app/audio/play',
  PAUSE: 'app/audio/pause',
  STOP: 'app/audio/stop',
  UPDATE_TIME: 'app/audio/update',
};

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

    if (!isPlaying) {
      timeUtils.clearAllTimeouts();
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
    }, audioConfig.UPDATE_INTERVAL)
  }
)

export const playThunk = offset => (
  (dispatch, getState) => {
    const { audio: { audio, currentTime } } = getState();

    timeUtils.clearAllTimeouts();

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
    currentTime: action.currentTime > 0 ? action.currentTime : 0,
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
    currentTime: action.currentTime > 0 ? action.currentTime : 0,
    timestamp: action.timestamp,
  }),
};

export default makeReducer(initialState, handlers);
