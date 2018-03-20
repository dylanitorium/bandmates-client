import React from 'react';
import styles from './section-layer.css';

const SectionLayer = props => (
  <div className={styles.container} >
    <div className={styles.reference} >
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
