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
    this.setState({ comment: '' });
  }

  render() {
    const { props, state } = this;

    return (
      <div style={{
        width: '300px',
        margin: '0 auto',
      }}>
        <div style={{
          color: 'white',
        }}>
          {props.section.id}
        </div>
        <div style={{
          background: 'white'
        }}>
          {props.comments.map(comment => (
            <div key={comment.id}>
              {comment.content}
            </div>
          ))}
        </div>

        <div style={{
          textAlign: 'right',
        }}>
          <button onClick={props.closeCommentBox}> close </button>
        </div>
        <div>
          <textarea value={state.comment} onChange={this.handleCommentChange} onKeyPress={this.handleEnterPress} />
          <button style={{ float: 'right'}} onClick={this.postComment}>
            Post
          </button>
          <button style={{ float: 'right'}} onClick={() => this.props.deleteSection(props.section.id)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}


export default SectionDetailsInterface;
