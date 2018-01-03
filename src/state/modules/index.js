import { combineReducers } from 'redux';
import audio from './audio';
import waveform from './waveform';
import cursor from './cursor';
import windowReducer from './window';

const reducer = combineReducers({ audio, waveform, cursor, window: windowReducer });

export default reducer;
