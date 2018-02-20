import React, { Component } from 'react';


class SectionDetailsInterface extends Component {
  state = {
    comment: this.props.comment || '',
  }

  handleCommentChange = (e) => {
    const comment = e.target.value;
    this.setState({ comment });
  }

  handleEnterPress = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      e.preventDefault();
      this.postComment();
    }
  }

  postComment = () => {
    this.props.addComment(this.state.comment);
  }

  render() {
    const { props, state } = this;
    return (
      <div style={{
        width: '300px',
        margin: '0 auto',
      }}>
        <div style={{
          background: 'white'
        }}>
          CommentsList
        </div>

        <div style={{
          textAlign: 'right',
        }}>
          <button onClick={props.closeCommentBox}> close </button>
        </div>
        <div>
          <textarea value={state.value} onChange={this.handleCommentChange} onKeyPress={this.handleEnterPress} />
          <button style={{ float: 'right'}} onClick={this.postComment}>
            Post
          </button>
        </div>
      </div>
    );
  }
}


export default SectionDetailsInterface;
