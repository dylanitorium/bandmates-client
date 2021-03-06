import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WaveformData from 'waveform-data';
import WaveFormLayer from '../../connected/WaveFormLayer';
import ClockLayer from '../../connected/ClockLayer';
import SelectionLayer from '../../connected/SelectionLayer';
import CursorLayer from '../../connected/CursorLayer';
import InterfaceLayer from '../../connected/InterfaceLayer';
import PlayButton from '../../connected/PlayButton';
import SectionLayer from '../../connected/SectionLayer';

class WaveFormInterface extends Component {
  componentDidMount() {
    const { props } = this;
    props.onMount();
  }

  render() {
    const { props } = this;

    if (!props.data) {
      return null;
    }

    const containerStyle = {
      background: '#36454F',
      position: 'relative',
      height: props.height,
    };

    return (
      <div>
        <div style={containerStyle}>
          <WaveFormLayer {...props}/>
          <SectionLayer {...props} />
          <ClockLayer {...props} />
          <SelectionLayer {...props} />
          <CursorLayer {...props} />
          <InterfaceLayer {...props} />
          <PlayButton {...props} />
        </div>
      </div>
    );
  }
}

WaveFormInterface.propTypes = {
  height: PropTypes.number.isRequired,
  amplitude: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(WaveformData),
};

export default WaveFormInterface;
