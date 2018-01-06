import React from 'react';
import PropTypes from 'prop-types';
import BasicAudioFile from 'utils/BasicAudioFile';
import styles from './play-button.css';

const PlayButton = props => (
  <div className={styles.button} onClick={props.onPlayClick}>
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
  audio: PropTypes.instanceOf(BasicAudioFile),
  isPlaying: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func.isRequired,
};

export default PlayButton;
