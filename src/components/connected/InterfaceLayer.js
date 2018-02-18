import { connect } from 'react-redux';
import * as interfaceActions from 'state/modules/interface/actions';
import InterfaceLayer from '../pure/WaveForm/InterfaceLayer/InterfaceLayer';


const mapStateToProps = state => ({});

const mapDispatchToProps = {
  onInterfaceDrag: interfaceActions.dragToTime,
};

export default connect(mapStateToProps, mapDispatchToProps)(InterfaceLayer);
