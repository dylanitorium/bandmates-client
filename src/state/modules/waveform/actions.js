import { actionTypes } from './actionTypes';
import { DEFAULT_WAVEFORM_WIDTH } from 'utils/constants';
import WaveformData from 'waveform-data';
import * as requestUtils from 'utils/request';

// Action Creators
const requestWaveformStart = source => ({
  type: actionTypes.REQUEST.START,
  source,
});

const requestWaveformSuccess = waveform => ({
  type: actionTypes.REQUEST.SUCCESS,
  waveform,
});

const requestWaveformFailure = error => ({
  type: actionTypes.REQUEST.FAILURE,
  error,
});

const resampleWaveform = waveform => ({
  type: actionTypes.waveform,
  waveform,
});

// Thunk
export const requestWaveform = source => (
  async (dispatch) => {
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

export const resampleWaveformThunk = width => (
  (dispatch, getState) => {
    const { waveform: { waveform } } = getState();
    const resampled = waveform.resample({ width });
    dispatch(resampleWaveform(resampled));
  }
);
