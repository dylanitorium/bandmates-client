import React from 'react';
import PropTypes from 'prop-types';
import Peaks from 'peaks.js';

class PeaksInterface extends React.Component {
  constructor(props) {
    super(props);
    this.peaks = null
  }

  componentDidMount() {
    this.peaks = Peaks.init({
        container: document.querySelector(this.props.containerSelector),
        mediaElement: document.querySelector(this.props.mediaSelector),
        ...this.props.peaksConfiguration,
    });
  }

  render () {
    return (
      <div>
        <div id={this.props.containerId}></div>
        <audio>
          <source src={this.props.source} type="audio/mpeg" />
        </audio>
      </div>
    );
  }
}

PeaksInterface.propTypes = {
  containerId: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  peaksConfiguration: PropTypes.object.isRequired,
};

export default PeaksInterface;
