import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';

const InterfaceLayer = props => {
  return (
    <Group>
      <Rect
        {...props}
        onClick={props.onInterfaceClick}
      />
    </Group>
  );
};

InterfaceLayer.propTypes = {
  onInterfaceClick: PropTypes.func.isRequired,
};

export default InterfaceLayer;
