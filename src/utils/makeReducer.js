const makeReducer = (initialState, handlers) => (
  (state = initialState, action) => {
    const { type, ...payload } = action;

    if (!handlers[type]) {
      return state;
    }

    return {
      ...state,
      ...handlers[type](state, payload),
    };
  }
);

export default makeReducer;
