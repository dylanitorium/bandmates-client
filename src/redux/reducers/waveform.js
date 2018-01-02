import * as requestUtils from '../../utils/request';
import makeReducer from '../../utils/makeReducer';
import { DEFAULT_WAVEFORM_WIDTH } from '../../constants';

// Action Types
const actionsTypes = {
  REQUEST: {
    START: 'app/waveform/request/start',
    SUCCESS: 'app/waveform/request/success',
    FAILURE: 'app/waveform/request/failure',
  },
  RESAMPLE: 'app/waveform/resample',
};

// Action Creators
const requestWaveformStart = (source) => ({
  type: actionTypes.REQUEST.START,
  source,
});

const requestWaveformSuccess = (waveform) => ({
  type: actionTypes.REQUEST.SUCCESS,
  waveform,
});

const requestWaveformFailure = (error) => ({
  type: actionTypes.REQUEST.FAILURE,
  error,
});

const resampleWaveform = (waveform) => ({
  type: actionTypes.waveform,
  waveform,
});

// Thunk
const requestWaveform = (source) => (
  (dispatch, getState) => {
    dispatch(requestWaveformStart(source));

    try {
      const buffer = await requestUtils.requestArrayBuffer(source);
      const waveform = WaveformData.create(buffer);
      const resampled = waveform.resample({
        width: DEFAULT_WAVEFORM_WIDTH,
      });

      dispatch(requestWaveformSuccess(resampled));
    } catch (error) {
      dispatch(requestWaveformFailure(error));
    }
  }
);

const resampleWaveformThunk = (width) => (
  (dispatch, getState) => {
    const { waveform: { waveform } } = getState();
    const resampled = waveform.resample({ width });
    dispatch(resampleWaveform(resampled));
  }
);

const initialState = {
  waveform: null,
  isRequesting: false,
  error: null
};

const handlers = {
  [actionTypes.REQUEST.START]: () => ({
    isRequesting: true,
  }),
  [actionTypes.REQUEST.SUCCESS]: (state, action) => ({
    isRequesting: false,
    waveform: action.waveform,
  }),
  [actionTypes.REQUEST.FINISH]: (state, action) => ({
    isRequesting: false,
    error: action.error,
  }),
  [actionTypes.RESAMPLE]: (state, action) => ({
    waveform: action.waveform,
  }),
};

export default makeReducer(initialState, handlers);
