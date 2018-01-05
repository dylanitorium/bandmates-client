import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

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
  <div style={buttonStyle} onClick={props.onPlayClick}>
  {
    !props.audio ? (
      <i className={'fas fa-spinner fa-spin'}/>
    ) : !props.isPlaying ? (
      <i className={'far fa-play-circle'}/>
    ) : (
      <i className={'far fa-pause-circle'}/>
    )
  }
  </div>
);

PlayButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func.isRequired,
};

export default Radium(PlayButton);
