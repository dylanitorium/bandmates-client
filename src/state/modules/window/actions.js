import { actionTypes } from './actionTypes';

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
export const getWindowWidth = () => (
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
