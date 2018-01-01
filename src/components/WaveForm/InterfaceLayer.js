import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';

const InterfaceLayer = props => {
  return (
    <Group>
      <Rect
        {...props}
      />
    </Group>
  );
};

InterfaceLayer.propTypes = {

};

export default InterfaceLayer;
