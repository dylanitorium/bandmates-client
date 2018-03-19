import React from 'react';
import Draggable from 'components/pure/Draggable/Draggable';
import styles from './section-layer.css';

const SectionLayer = props => (
  <div
    className={styles.container}
    style={props.waveformContainerStyle}
  >
    <div
      className={styles.reference}
      style={props.waveformReferenceStyle}
    >
      {props.sections.map(section => (
        <div
          className={styles.section}
          key={section.id}
          style={section.style}
          onClick={() => props.onSectionClick(section.id)}
        >
        </div>
      ))}
    </div>
  </div>
);

export default SectionLayer;
