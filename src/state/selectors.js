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

export const waveformSelector = state => state.waveform.waveform;

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

export const sectionsSelector = state => state.sections.sections;

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
);

export const currentTimeSelector = state => state.audio.currentTime;

export const audioSelector = state => state.audio.audio;

export const isPlayingSelector = state => state.audio.isPlaying;

export const commentBoxVisibleSelector = state => !!state.sections.activeSection;

export const activeSectionIdSelector = state => state.sections.activeSection;

export const activeSectionSelector = createSelector(
  sectionsSelector,
  activeSectionIdSelector,
  (sections, activeSectionId) => sections.find(({ id }) => id === activeSectionId),
)

export const allCommentsSelector = state => state.comments.comments;

export const commentsSelector = createSelector(
  allCommentsSelector,
  activeSectionIdSelector,
  (comments, activeSectionId) => comments.filter(({ sectionId }) => sectionId === activeSectionId),
);

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

export const selectionIsDraggingSelector = state => state.selection.isDragging;
