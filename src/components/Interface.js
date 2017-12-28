import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Rect, Shape, Layer } from 'react-konva';
import debounce from 'debounce';

const SegmentOverlay = props => (
  props.active
    ? (
      <Rect
        opacity={0.5}
        {...props}
      />
    ) : (
      null
    )
)

class WaveForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isCreatingSegment: false,
        segmentStart: 0,
        mousePosition: 0,
        segments: [],
      };
    }

    render () {
      return (
        <Group>
          <SegmentOverlay
            active={this.state.isCreatingSegment}
            x={this.state.segmentStart}
            width={this.state.mousePosition - this.state.segmentStart}
            height={this.props.height}
            fill="grey"
            stroke="grey"
            strokeWidth={1}
          />
          <Rect
          {...this.props}
          onMouseDown={(event) => {
            const { evt } = event;

            if (evt.shiftKey) {
              this.setState({
                isCreatingSegment: true,
                segmentStart: evt.x,
              });
            }
          }}
          onMouseMove={(event) => {
            const { evt } = event;

            this.setState({
              mousePosition: evt.x,
            });
          }}
          onMouseUp={(event) => {
            const { evt } = event;

            if (this.state.isCreatingSegment) {
              this.setState({
                isCreatingSegment: false,
                segmentStart: false,
                segments: [
                  ...this.state.segments,
                  {
                    start: this.state.segmentStart,
                    end: evt.x,
                  }
                ],
              });
            }
          }}
          />
        </Group>
      );
    }
};

WaveForm.propTypes = {

};

WaveForm.defaultProps = {
  onMouseDown: () => {},
};

export default WaveForm;