import React from 'react';
import PropTypes from 'prop-types';
import styles from './comment-list.css';

const onKeyPress = handleEnter => event => {
  const keycode = event.keyCode || event.which;
  const enterKey = keycode === 13;
  const shiftKey = event.shiftKey;
  const { value } = event.target;

  if (enterKey && !shiftKey) {
    event.preventDefault();
    handleEnter(value);
  }
};

const onChange = handleChange => event => {
  const { value } = event.target;
  handleChange(value);
};

const CommentList = props => (
  <div className={styles.container}>
    <header className={styles.header}>
      <h4 className={styles.title}>{props.section.id}</h4>
    </header>
    <aside className={styles.main}>
      <ul className={styles.list}>
        {
          props.comments.map(comment => (
            <div key={comment.id} className={styles.comment}>
              {comment.content}
            </div>
          ))
        }
      </ul>
    </aside>
    <footer className={styles.footer}>
      <textarea
        className={styles.input}
        placeholder="Write a comment..."
        value={props.commentFieldValue}
        onChange={onChange(props.updateCommentValue)}
        onKeyPress={onKeyPress(props.addComment)}
      />
    </footer>
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  addComment: PropTypes.func.isRequired,
}

export default CommentList;
