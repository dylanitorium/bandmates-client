import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import Play from 'react-icons/lib/fa/play-circle-o';
import Pause from 'react-icons/lib/fa/pause-circle-o';

const buttonStyle = {
  border: 0,
  background: 'none',
  fontSize: '50px',
  color: 'white',
  opacity: 0.7,
  position: 'absolute',
  bottom: '15px',
  left: '10px',
  ':active': {
    outline: 'none',
  },
  ':focus': {
    outline: 'none',
  },
}

const PlayButton = props => (
  <button style={buttonStyle} onClick={props.onPlayClick}>
  {
    props.isPlaying ? (
      <Pause />
    ) : (
      <Play />
    )
  }
  </button>
);

PlayButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func.isRequired,
};

export default Radium(PlayButton);
