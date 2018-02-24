import React from 'react';
import styles from './section-layer.css';

const sectionStyles = ({ start, end }) => {
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
};

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
          style={sectionStyles(section)}
        >
        </div>
      ))}
    </div>
  </div>
);

export default SectionLayer;
