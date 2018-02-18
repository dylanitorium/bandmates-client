import React from 'react';
import styles from './section-layer.css';

const SectionLayer = props => (
  <div
    className={styles.container}
    style={{
      width: props.width,
      height: props.height,
      transform: `translate(${(props.cursorPostion  * -1) + (props.windowWidth / 2)}px, 0px)`,
    }}
  >
    <div
      className={styles.reference}
      style={{
        height: props.height,
      }}
    >
      {props.sections.map(section => (
        <div
          className={styles.section}
          key={section.id}
          style={{
            left: section.start,
            width: section.end - section.start,
          }}
        >
        </div>
      ))}
    </div>
  </div>
);

export default SectionLayer;
