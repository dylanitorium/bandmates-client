import React, { Component } from 'react';
import section from './section-details-interface.css'
import comments from './section-comments.css'


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
    return (
      <div className={section.container}>
      <header className={section.header}>
        <button className={section.closeButton} onClick={props.closeCommentBox}> close </button>
      </header>
        <div className={comments.container}>
          {!props.comments.length && (
            <div className={comments.placeholder}>
              This section has no comments yet
            </div>
          )}
          {props.comments.map(comment => (
            <div className={comments.comment} key={comment.id}>
              {comment.content}
              <div className={comments.actions}>
                <button
                  className={comments.editButton}
                  onClick={() => this.props.selectComment(comment.id)}
                >
                  Edit
                </button>
                <button
                  className={comments.deleteButton}
                  onClick={() => this.props.deleteComment(comment.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={comments.inputContainer}>
          <textarea
            className={comments.input}
            value={props.commentValue}
            onChange={this.handleCommentChange}
            onKeyPress={this.handleEnterPress}
          />
        </div>
        <div className={section.actions}>
          <button
            className={section.postButton}
            onClick={this.postComment}
          >
            Post
          </button>
          <button
            className={section.deleteButton}
            onClick={() => this.props.deleteSection(props.section.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}


export default SectionDetailsInterface;
