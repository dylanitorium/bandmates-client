import React from 'react';
import PropTypes from 'prop-types';
import styles from './comment-list.css';



class ContextMenu extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
   isOpen: false,
  }

  shouldShowMenu = () => this.state.isOpen;

  handleAction = (action) => () => {
    action();
    this.toggleMenu();
  }

  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className={styles.sectionContextMenuContainer}>
        <button
          onClick={this.toggleMenu}
          className={styles.sectionContextMenuButton}
        >
          <i className="fa fa-ellipsis-v fa-lg" />
        </button>
        {
          this.shouldShowMenu()
            ? (
              <div className={styles.sectionContextMenu}>
                <ul className={styles.sectionContextMenuList}>
                    {
                      this.props.options.map(option => (
                        <li key={option.label} className={styles.sectionContextMenuItem}>
                          <a
                            onClick={this.handleAction(option.action)}
                            className={styles.sectionContextMenuAction}
                          >
                            {option.label}
                          </a>
                        </li>
                      ))
                  }
                </ul>
              </div>
            )
            : null
        }
      </div>
    );
  }
}


const handleKeyPress = props => event => {
 event.stopPropagation();

 if (event.key === 'Enter') {
   props.setSectionNameEditable(false)
 }
}

const SectionTitle = props => (
  props.isSectionNameEditable
    ? (
      <input
        type="text"
        value={props.section.name}
        className={styles.editTitle}
        onKeyPress={handleKeyPress(props)}
        onChange={(event) => {
          props.editSectionName(props.section.id, event.target.value)
        }}
      />
    )
    : (
      <h4 className={styles.title}>{props.section.name}</h4>
    )
);


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
      <button onClick={props.clearActiveSection} className={styles.sectionBackButton}>
        <i className="fa fa-angle-left fa-2x" />
      </button>
      <div className={styles.headerLeft}>
        <SectionTitle {...props} />
        <div className={styles.sectionMetaData}>{props.section.startNice} - {props.section.endNice}</div>
      </div>
      <ContextMenu options={[
        {
          label: "Rename Section",
          action: () => props.setSectionNameEditable(true),
        },
        {
          label: "Delete Section",
          action: () => props.deleteSection(props.section.id),
        }
      ]} />
    </header>
    <aside className={styles.main}>
      <ul className={styles.list}>
        {
          props.comments.map(comment => (
            <div
              key={comment.id}
              className={comment.isOwnedByUser ? styles.ownedComment : styles.comment}
            >
              {comment.content}
              <div className={styles.commentMetaData}>
                {comment.lastEditedNice}
              </div>
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
