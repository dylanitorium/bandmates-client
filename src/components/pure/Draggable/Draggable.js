import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { conditionalClasses } from 'utils/conditionalClasses';
import draggable from './draggable.css';

/**
 * @callback onDrag
 * @param {number} movement
 */

/**
 * @class
 * @prop {onDrag} onDrag
 * @prop {string} containerClass
 * @prop {string} controlClass
 * @prop {object} controlStyle
 */
class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      activeControl: null,
      dragStart: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('mouseup', this.onDragEnd);
    window.addEventListener('touchend', this.onDragEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onDragEnd);
    window.removeEventListener('touchend', this.onDragEnd);
  }

  getActiveControl = (controlId) => (
    this.props.controls.find(({ id }) => id === controlId || this.state.activeControl)
  )

  startDrag = (clientX, id) => {
    this.setState({
      isDragging: true,
      dragStart: clientX,
      activeControl: id,
    });


    this.getActiveControl(id).onDragStart(clientX);
  }

  onTouchStart = (id) => {
    return (event) =>  {
      const { touches } = event;
      const { clientX } = touches[0];
      this.startDrag(clientX, id);
    };
  }

  onMouseDown = (id) => {
    return (event) =>  {
      const { clientX } = event;
      this.startDrag(clientX, id);
    }
  }

  dragMove = (clientX) => {
    const { isDragging, dragStart } = this.state;

    if (!isDragging) {
      return;
    }

    const movement = clientX - dragStart;
    this.getActiveControl().onDrag(movement);

    this.setState({
      dragStart: clientX,
    });
  }

  onTouchMove = (event) =>  {
    const { touches } = event;
    const { clientX } = touches[0];

    this.dragMove(clientX);
  }

  onMouseMove = (event) =>  {
    const { clientX } = event;

    this.dragMove(clientX);
  }

  onDragEnd = (event) =>  {

    if (this.state.isDragging) {

      const activeControl = this.getActiveControl();

      this.setState({
        isDragging: false,
        activeControl: null,
      });

      activeControl.onDragEnd(event);
    }
  }

  getContainerClasses() {
    return conditionalClasses({
      [this.props.containerClass]: true,
      [draggable.dragging]: this.state.isDragging,
    })
  }

  getControlClasses(classes) {
    return conditionalClasses({
      [classes]: !!classes,
      [draggable.default]: true,
      [draggable.dragging]: this.state.isDragging,
    })
  }

  render() {
    return (
      <div
        className={this.getContainerClasses()}
      >
        <div style={{
          height: '100%',
          width: '100%',
          position: 'relative',
        }}>
          {this.props.controls.map((control) => {
            return (
              <div
                key={control.id}
                id={control.id}
                className={this.getControlClasses(control.class)}
                onMouseDown={this.onMouseDown(control.id)}
                onTouchStart={this.onTouchStart(control.id)}
                style={control.controlStyle || {}}
                onClick={control.onClick}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

Draggable.propTypes = {
  children: PropTypes.node,
  containerClass: PropTypes.string,
  controlClass: PropTypes.string,
  controlStyle: PropTypes.object,
  onDrag: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onClick: PropTypes.func,
};

Draggable.defaultProps = {
  children: undefined,
  containerClass: undefined,
  controlClass: undefined,
  controlStyle: undefined,
  onDragStart: () => {},
  onDrag: () => {},
  onDragEnd: () => {},
  onClick: () => {},
};

export default Draggable;
