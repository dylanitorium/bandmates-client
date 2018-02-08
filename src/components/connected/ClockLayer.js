import { connect } from 'react-redux';
import ClockLayer from '../pure/WaveForm/ClockLayer/ClockLayer';

const mapStateToProps = state => ({
  currentTime: state.audio.currentTime,
});

export default connect(mapStateToProps)(ClockLayer);
