import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './modules';

export const store = createStore(reducer, applyMiddleware(thunk, logger));
