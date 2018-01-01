import AudioFile from 'bandmates/utils';

// Config
const audioConfig = {
  UPDATE_INTERVAL: 100,
}

// Action Types
const actionTypes = {
  REQUEST: {
    START: 'app/audio/request/start',
    SUCCESS: 'app/audio/request/success',
    FAILURE: 'app/audio/request/failure',
  },
  PLAY: 'app/audio/play',
  PAUSE: 'app/audio/pause',
  UPDATE_TIME: 'app/audio/update',
};

// Action Creators
const requestAudioStart = () => ({
  type: actionTypes.REQUEST.START,
});

const requestAudioSuccess = audio => ({
  type: actionTypes.REQUEST.SUCCESS,
  audio,
});

const requestAudioFailure = error => ({
  type: actionTypes.REQUEST.FAILURE,
  error,
})

const play = offset => ({
  type: actionTypes.PLAY,
  offset,
});

const pause = () => ({
  type: actionTypes.PAUSE,
});

const updateTime = (currentTime, timeout) => ({
  type: actionTypes.UPDATE_TIME,
  currentTime,
  timeout,
});

const requestAudio = source => (
  async (dispatch, getState) => {
    dispatch(requestAudioStart());

    const audio = new AudioFile(source);

    try {
      await audio.init();
    } catch (error) {
      dispatch(requestAudioFailure(error));
    }

    dispatch(requestAudioSuccess(audio));
  }
);

// Thunk Actions
const updateTimeThunk = () => (
  (dispatch, getState) => {
    const { audio: { audio, isPlaying, timeout } } = getState();
    if (isPlaying) {
      dispatch(
        updateTime(
          audio.getCurrentTime(),
          setTimeout(() => {
            dispatch(updateTimeThunk());
          }, audioConfig.UPDATE_INTERVAL)
        )
      );
    } else {
      clearTimeout(timeout);
    }
  }
)

const playThunk = offset => (
  (dispatch, getState) => {
    const { audio: { audio } } = getState();
    audio.play(offset || audio.getCurrentTime());
    dispatch(updateTimeThunk());
  }
);

const pauseThunk = () => (
  (dispatch, getState) => {
    const { audio } = getState();
    audio.stop();
    dispatch(pause());
  }
);

// Reducer
const initialState = {
  isRequesting: false,
  audio: null,
  isPlaying: false,
  timeout: null,
  currentTime: 0,
  error: null
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
  [actionTypes.PLAY]: () => ({
    isPlaying: true,
  }),
  [actionTypes.PAUSE]: () => ({
    isPlaying: false,
  }),
  [actionTypes.UPDATE_TIME]: (state, action) => ({
    currentTime: action.currentTime,
  }),
}

export default reducer = (state = initialState, action) => {
  const { type, ...action } = action;

  if (!handlers[type]) {
    return state;
  }

  return {
    ...state,
    ...handlers[type](state, action),
  };
}
