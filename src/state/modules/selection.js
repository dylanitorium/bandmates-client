import makeReducer from 'utils/makeReducer';

export const actionTypes = {
  CREATE_SECTION: 'CREATE_SECTION',
  UPDATE_SELECTOR_OFFSET: 'UPDATE_SELECTOR_OFFSET',
};

export const createSection = (selectorOffset) => ({
  type: actionTypes.CREATE_SECTION,
  selectorOffset,
});

export const dragSelector = (movement) => ({
  type: actionTypes.UPDATE_SELECTOR_OFFSET,
  movement,
});

const initialState = {
  selectorOffset: 0,
}

const handlers = {
  [actionTypes.UPDATE_SELECTOR_OFFSET]: (state, action) => ({
    selectorOffset: state.selectorOffset + action.movement,
  }),
  [actionTypes.CREATE_SECTION]: (state, action) => ({
    selectorOffset: 0,
  }),
}

export default makeReducer(initialState, handlers);
