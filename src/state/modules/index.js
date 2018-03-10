import { combineReducers } from 'redux';
import audio from './audio/reducer';
import waveform from './waveform/reducer';
import cursor from './cursor/reducer';
import windowReducer from './window/reducer';
import selection from './selection/reducer';
import sections from './sections/reducer';
import comments from './comments/reducer';

const reducer = combineReducers({
  audio,
  waveform,
  cursor,
  window: windowReducer,
  selection,
  sections,
  comments
});

export default reducer;
