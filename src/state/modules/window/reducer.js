import makeReducer from 'utils/makeReducer';
import { actionTypes } from './actionTypes';

// Reducer
const initialState = {
  width: 0,
};

const handlers = {
  [actionTypes.RESIZE]: (state, action) => ({
    width: action.width,
  }),
};

export default makeReducer(initialState, handlers);
