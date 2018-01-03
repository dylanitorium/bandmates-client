import { combineReducers } from 'redux';
import audio from './audio';
import waveform from './waveform';
import cursor from './cursor';

const reducer = combineReducers({ audio, waveform, cursor });

export default reducer;
