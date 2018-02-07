import makeReducer from 'utils/makeReducer';

export const actionTypes = {
  CREATE_SECTION: 'app/sections/create',
};

export const createSection = (id, start, end) => ({
  type: actionTypes.CREATE_SECTION,
  id,
  start,
  end,
});

export const createSectionThunk = () => (
  (dispatch, getState) => {
    const { selection: { selectorOffset, selectorStart }, cursor: { cursorPostion } } = getState();
    dispatch(createSection(`${selectorStart}${selectorOffset}`, selectorStart, (selectorOffset + cursorPostion)));
  }
);

const initialSectionState = {
  start: null,
  end: null,
};

const section = (state = initialSectionState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case actionTypes.CREATE_SECTION:
      return {
        ...state,
        start: payload.start,
        end: payload.end,
      };
    default:
      return state;
  }
};

const initialState = {};

const handlers = {
  [actionTypes.CREATE_SECTION]: (state, action) => ({
    [action.id]: section(state, action),
  }),
}

export default makeReducer(initialState, handlers);
