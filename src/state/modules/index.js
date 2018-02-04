import { combineReducers } from 'redux';
import audio from './audio';
import waveform from './waveform';
import cursor from './cursor';
import windowReducer from './window';
import selection from './selection';
import sections from './sections';

const reducer = combineReducers({ audio, waveform, cursor, window: windowReducer, selection, sections });

export default reducer;
