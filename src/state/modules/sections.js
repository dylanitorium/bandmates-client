import makeReducer from 'utils/makeReducer';
import md5 from 'md5';

export const actionTypes = {
  CREATE_SECTION: 'app/sections/create',
  CLOSE_COMMENT_BOX: 'app/sections/comments/close',
  UPDATE_COMMENT: 'app/sections/comments/update',
};

export const createSection = (id, start, end) => ({
  type: actionTypes.CREATE_SECTION,
  id,
  start,
  end,
});

const createId = (start, end) => {
  return `${md5(`${start}${end}`)}.${Date.now()}`;
}

export const createSectionThunk = () => (
  (dispatch, getState) => {
    const { selection: { selectorOffset, selectorStart }, cursor: { cursorPostion } } = getState();
    const id = createId(selectorOffset, selectorStart);
    const end = selectorOffset + cursorPostion;
    dispatch(createSection(id, selectorStart, end));
  }
);

export const closeCommentBox = () => ({
  type: actionTypes.CLOSE_COMMENT_BOX,
});

export const updateComment = (sectionId, value) => ({
  type: actionTypes.UPDATE_COMMENT,
  sectionId,
  value,
});

const initialSectionState = {
  id: null,
  start: null,
  end: null,
  comment: '',
};

const section = (state = initialSectionState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case actionTypes.CREATE_SECTION:
      return {
        ...state,
        id: payload.id,
        start: payload.start,
        end: payload.end,
      };
    case actionTypes.UPDATE_COMMENT:
      return {
        ...state,
        comment: payload.value,
      };
    default:
      return state;
  }
};

const initialState = {
  commentBoxIsOpen: false,
  activeSection: null,
  sections: {},
};

const handlers = {
  [actionTypes.CREATE_SECTION]: (state, action) => ({
    sections: {
      [action.id]: section(state.sections[action.id], action),
    },
    activeSection: action.id,
    commentBoxIsOpen: true,
  }),
  [actionTypes.CLOSE_COMMENT_BOX]: () => ({
    activeSection: null,
    commentBoxIsOpen: false,
  }),
  [actionTypes.UPDATE_COMMENT]: (state, action) => ({
    sections: {
      [action.sectionId]: section(state.sections[action.sectionId], action),
    },
  }),
}

export default makeReducer(initialState, handlers);
