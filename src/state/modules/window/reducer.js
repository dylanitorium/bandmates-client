import makeReducer from 'utils/makeReducer';
import { actionTypes } from './actionTypes';
import { getWindowWidth } from './actions';

// Reducer
const initialState = {
  width: getWindowWidth(),
};

const handlers = {
  [actionTypes.RESIZE]: (state, action) => ({
    width: action.width,
  }),
};

export default makeReducer(initialState, handlers);
