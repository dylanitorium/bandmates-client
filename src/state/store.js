import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './modules';

const isDev = process.env.NODE_ENV === 'development';
const loggerIfDev = isDev ? logger : null;

const middleware = [
  thunk,
  // loggerIfDev,
].filter(m => !!m);


export const store = createStore(reducer, applyMiddleware(...middleware));
