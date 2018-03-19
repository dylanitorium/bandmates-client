import React, { Component } from 'react';


class SectionDetailsInterface extends Component {

  handleCommentChange = (e) => {
    const comment = e.target.value;
    this.props.updateCommentValue(comment);
  }

  handleEnterPress = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      e.preventDefault();
      this.postComment();
    }
  }

  postComment = () => {
    if (this.props.activeCommentId) {
      this.props.editComment(this.props.activeCommentId, this.props.commentValue);
    } else {
      this.props.addComment(this.props.commentValue);
    }
  }

  render() {
    const { props } = this;

    console.log(props);

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
              <button style={{ float: 'right'}} onClick={() => this.props.selectComment(comment.id)}>
                Edit
              </button>
              <button style={{ float: 'right'}} onClick={() => this.props.deleteComment(comment.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: 'right',
        }}>
          <button onClick={props.closeCommentBox}> close </button>
        </div>
        <div>
          <textarea value={props.commentValue} onChange={this.handleCommentChange} onKeyPress={this.handleEnterPress} />
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
