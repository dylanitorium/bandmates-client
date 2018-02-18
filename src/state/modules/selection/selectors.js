import { createSelector } from 'reselect';

export const windowWidthSelector = state => state.window.width;

export const windowCenterSelector = createSelector(
  windowWidthSelector,
  width => width / 2,
);

export const widthOffsetSelector = createSelector(
  windowWidthSelector,
  width => ((width / 2) - 3)
);

export const offsetSelector = state => state.selection.selectorOffset;

export const cursorPostionSelector = state => state.cursor.cursorPostion;

export const selectorPositionSelector = createSelector(
  widthOffsetSelector,
  offsetSelector,
  (width, offset) => width + offset,
);

export const selectorStartSelector = state => state.selection.selectorStart;

export const selectionRightSelector = createSelector(
  windowCenterSelector,
  cursorPostionSelector,
  selectorStartSelector,
  offsetSelector,
  (center, cursor, start, offset) => (offset > 0 ? center - offset : (center + (cursor - start))),
);

export const selectionLeftSelector = createSelector(
  windowCenterSelector,
  cursorPostionSelector,
  selectorStartSelector,
  offsetSelector,
  (center, cursor, start, offset) => offset > 0 ? (center - (cursor - start)) : center + offset,
);
