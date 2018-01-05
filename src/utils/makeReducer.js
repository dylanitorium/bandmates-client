const makeReducer = (initialState, handlers, name) => (
  (state = initialState, action) => {
    const { type, ...payload } = action;

    const stateInContext = name ? state[name] : state;

    if (!handlers[type]) {
      return stateInContext;
    }

    return {
      ...stateInContext,
      ...handlers[type](state, payload),
    };
  }
);

export default makeReducer;