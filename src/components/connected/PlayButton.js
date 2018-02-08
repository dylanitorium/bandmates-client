import { connect } from 'react-redux';
import * as interfaceActions from 'state/modules/interface';
import PlayButton from '../pure/WaveForm/PlayButton/PlayButton';

const mapStateToProps = state => ({
  audio: state.audio.audio,
  isPlaying: state.audio.isPlaying,
});

const mapDispatchToProps = {
  onPlayClick: interfaceActions.playToggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
