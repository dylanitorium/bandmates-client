import makeReducer from 'utils/makeReducer';

// Action Types
export const actionTypes = {
  RESIZE: 'app/window/resize',
};

// Action Creators
export const resizeWindow = width => ({
  type: actionTypes.RESIZE,
  width,
});

// Thunk

// Utility
const onThrottledResize = (callback) => {
  let running = false;

  window.addEventListener('resize', (event) => {
    if (running) {
      return;
    }

    running = true;

    requestAnimationFrame(() => {
      callback(event)
      running = false;
    });
  });
}

// Utility
const getWindowWidth = () => (
  window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth
);

export const listenForResize = () => (
  (dispatch, getState) => {
    onThrottledResize(() => {
      dispatch(resizeWindow(getWindowWidth()))
    })
  }
);

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
