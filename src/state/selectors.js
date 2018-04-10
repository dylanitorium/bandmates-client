import { createSelector } from 'reselect';
import moment from 'moment';
import * as timeUtils from 'utils/time';

export const waveformSelector = state => state.waveform.waveform;

export const waveformHeightSelector = state => state.waveform.height;

export const waveformWidthSelector = state => state.waveform.width;

export const amplitudeSelector = state => state.waveform.amplitude;

export const windowWidthSelector = state => state.window.width;

export const currentTimeSelector = state => state.audio.currentTime;

export const audioSelector = state => state.audio.audio;

export const isPlayingSelector = state => state.audio.isPlaying;

export const activeSectionIdSelector = state => state.sections.activeSection;

export const sectionsSelector = state => state.sections.sections;

export const selectorStartSelector = state => state.selection.selectorStart;

export const selectionIsDraggingSelector = state => state.selection.isDragging;

export const offsetSelector = state => state.selection.selectorOffset;

export const allCommentsSelector = state => state.comments.comments;

export const activeCommentIdSelector = state => state.comments.activeComment;

export const commentValueSelector = state => state.comments.commentFieldValue;

export const isSectionNameEditableSelector = state => state.discussion.isSectionNameEditable

export const pixelFactorSelector = createSelector(
  waveformSelector,
  waveform => (waveform ? waveform.pixels_per_second : null),
);

export const cursorPositionSelector = createSelector(
  pixelFactorSelector,
  currentTimeSelector,
  (pixelFactor, currentTime) => pixelFactor * currentTime,
);

export const zeroBasedCurrentTimeSelector = createSelector(
  currentTimeSelector,
  currentTime => currentTime > 0 ? currentTime : 0,
);

export const currentTimeAsClockSelector = createSelector(
  zeroBasedCurrentTimeSelector,
  time => timeUtils.toClock(time),
);

export const waveformContainerTransformSelector = createSelector(
  cursorPositionSelector,
  windowWidthSelector,
  (cursorPostion, windowWidth) => (
    `translate(${(cursorPostion  * -1) + (windowWidth / 2)}px, 0px)`
  )
);

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

export const activeSectionSelector = createSelector(
  sectionsSelector,
  activeSectionIdSelector,
  pixelFactorSelector,
  (sections, activeSectionId, pixelFactor) => {
    const activeSection = sections.find(({ id }) => id === activeSectionId);

    return activeSection ? {
      ...activeSection,
      startNice: timeUtils.toClock(activeSection.start / pixelFactor),
      endNice: timeUtils.toClock(activeSection.end / pixelFactor),
    } : null;
  },
);

export const commentsSelector = createSelector(
  allCommentsSelector,
  activeSectionIdSelector,
  (comments, activeSectionId) => (
    comments
      .filter(({ sectionId }) => sectionId === activeSectionId)
      .map(comment => ({
        ...comment,
        isOwnedByUser: true,
        lastEditedNice: moment(comment.lastEdited).format('HH:mm a'),
      }))
  ),
);

export const windowCenterSelector = createSelector(
  windowWidthSelector,
  width => width / 2,
);

export const widthOffsetSelector = createSelector(
  windowWidthSelector,
  width => ((width / 2) - 3)
);

export const selectorPositionSelector = createSelector(
  widthOffsetSelector,
  offsetSelector,
  (width, offset) => width + offset,
);

export const selectionRightSelector = createSelector(
  windowCenterSelector,
  cursorPositionSelector,
  selectorStartSelector,
  offsetSelector,
  (center, cursor, start, offset) => (offset > 0 ? center - offset : (center + (cursor - start))),
);

export const selectionLeftSelector = createSelector(
  windowCenterSelector,
  cursorPositionSelector,
  selectorStartSelector,
  offsetSelector,
  (center, cursor, start, offset) => offset > 0 ? (center - (cursor - start)) : center + offset,
);

export const activeCommentSelector = createSelector(
  activeCommentIdSelector,
  commentsSelector,
  (commentId, comments) => comments.find(({ id }) => id === commentId)
);

export const waveformOffsetSelector = createSelector(
  cursorPositionSelector,
  windowCenterSelector,
  (cursor, center) => (cursor * -1) + center,
);

export const sectionsForDisplaySelector = createSelector(
  sectionsSelector,
  windowCenterSelector,
  waveformOffsetSelector,
  activeSectionIdSelector,
  (sections, center, waveformOffset, activeId) => sections.map(({ id, start, end }) => {
    const left = (end < start) ? end + waveformOffset : start + waveformOffset;
    const width = (end < start) ? start - end : end - start;
    const right = (left + width) - 5;

    const styles = {
      select: {
        left,
        width,
      },
      leftEdit: {
        left
      },
      rightEdit: {
        left: right
      },
    };

    if (id === activeId) {
      styles.select['backgroundColor'] = 'rgba(0, 116, 217, 0.2)';
      styles.select['borderColor'] = 'rgb(0, 116, 217)';
    }

    return {
      id,
      styles,
    };
  })
);

export const sectionsForDiscussionSelector = createSelector(
  sectionsSelector,
  pixelFactorSelector,
  activeSectionIdSelector,
  allCommentsSelector,
  (sections, pixelFactor, activeSectionId, comments) => (
    pixelFactor
      ? sections.map(section => ({
        ...section,
        start: timeUtils.toClock(section.start / pixelFactor),
        end: timeUtils.toClock(section.end / pixelFactor),
        active: section.id === activeSectionId,
        comments: comments.filter(({ sectionId }) => sectionId === section.id),
      }))
      : []
  )
)
