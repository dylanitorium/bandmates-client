import { connect } from 'react-redux';
import * as interfaceActions from 'state/modules/interface/actions';
import PlayButton from '../pure/WaveForm/PlayButton/PlayButton';
import {
  audioSelector,
  isPlayingSelector,
} from 'state/selectors';

const mapStateToProps = state => ({
  audio: audioSelector(state),
  isPlaying: isPlayingSelector(state),
});

const mapDispatchToProps = {
  onPlayClick: interfaceActions.playToggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
