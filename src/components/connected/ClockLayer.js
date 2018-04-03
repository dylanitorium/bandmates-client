import { connect } from 'react-redux';
import ClockLayer from '../pure/WaveForm/ClockLayer/ClockLayer';
import { currentTimeAsClockSelector } from 'state/selectors';

const mapStateToProps = state => ({
  currentTime: currentTimeAsClockSelector(state),
});

export default connect(mapStateToProps)(ClockLayer);
