import React from 'react';

const SectionLayer = props => (
  <div
    className="section-layer__container"
    style={{
      position: 'absolute',
      width: props.width,
      height: props.height,
      top: 0,
      bottom: 0,
      transform: `translate(${(props.cursorPostion  * -1) + (props.windowWidth / 2)}px, 0px)`,
      display: 'flex',
    }}
  >
    <div
      className="section-layer__section-reference"
      style={{
        height: props.height,
        width: '100%',
        position: 'relative',
      }}
    >
      {props.sections.map(section => (
        <div
          className="section-layer__section"
          key={section.start+''+section.end}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            background: 'rgba(200, 200, 200, 0.5)',
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
