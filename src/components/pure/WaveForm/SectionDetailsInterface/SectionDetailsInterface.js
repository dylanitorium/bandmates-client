import React from 'react';


const SectionDetailsInterface = props => (
  <div style={{
    width: '300px',
    margin: '0 auto',
  }}>
    <div style={{
      textAlign: 'right',
    }}>
      <button onClick={props.closeCommentBox}> close </button>
    </div>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <div> Start: {props.start} </div>
      <div> End: {props.end} </div>
    </div>
    <div>
      <textarea value={props.value} onChange={(e) => {
        props.onCommentChange(props.sectionId, e.target.value);
      }} />
    </div>
  </div>
);

export default SectionDetailsInterface;
