import { combineReducers } from 'redux';
import audio from './audio';
import waveform from './waveform/index';

const reducer = combineReducers({ audio, waveform });

export default reducer;
