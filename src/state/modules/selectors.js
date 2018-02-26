import { createSelector } from 'reselect';

export const amplitudeSelector = state => state.waveform.amplitude;

export const cursorPositionSelector = state => state.cursor.cursorPostion;

export const windowWidthSelector = state => state.window.width;

export const waveformContainerTransformSelector = createSelector(
  cursorPositionSelector,
  windowWidthSelector,
  (cursorPostion, windowWidth) => (
    `translate(${(cursorPostion  * -1) + (windowWidth / 2)}px, 0px)`
  )
);

export const waveformHeightSelector = state => state.waveform.height;

export const waveformWidthSelector = state => state.waveform.width;

export const waveformContainerStyleSelector = createSelector(
  waveformHeightSelector,
  waveformWidthSelector,
  waveformContainerTransformSelector,
  (height, width, transform) => ({ height, width, transform })
);

export const waveformReferenceStyleSelector = createSelector(
  waveformHeightSelector,
  height => ({ height })
);

export const sectionsSelector = state => (
  Object.keys(state.sections.sections).map(id => state.sections.sections[id])
);

export const sectionsForDisplaySelector = createSelector(
  sectionsSelector,
  (sections) => sections.map(({ id, start, end }) => ({
    id,
    style: (() => {
      if (end < start) {
        return {
          left: end,
          width: start - end,
        };
      }

      return {
        left: start,
        width: end - start,
      };
    })(),
  }))
)
