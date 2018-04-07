import React from 'react';
import SectionList from '../../connected/SectionList';
import CommentList from '../../connected/CommentList';

const Discussion = (props) => {
  if (!props.activeSection) {
    return <SectionList {...props} />;
  }

  return <CommentList {...props} />;
}

export default Discussion;
