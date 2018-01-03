import * as audioActions from './audio';

// Thunk
export const jumpToTime = (offset) => (
  (dispatch, getState) => {
    const { audio: { audio }, waveform: { waveform } } = getState();

    if (!audio) {
      return;
    }

    const timeOffset = waveform.seconds_per_pixel * offset;

    dispatch(audioActions.playThunk(timeOffset));
  }
);
