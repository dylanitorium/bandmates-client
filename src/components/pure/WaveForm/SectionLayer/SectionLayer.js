import React from 'react';
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
        >
        </div>
      ))}
    </div>
  </div>
);

export default SectionLayer;
