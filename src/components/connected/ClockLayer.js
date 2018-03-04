import { connect } from 'react-redux';
import ClockLayer from '../pure/WaveForm/ClockLayer/ClockLayer';
import { currentTimeSelector } from 'state/selectors';

const mapStateToProps = state => ({
  currentTime: currentTimeSelector(state),
});

export default connect(mapStateToProps)(ClockLayer);
