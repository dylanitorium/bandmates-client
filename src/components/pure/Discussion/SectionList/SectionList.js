import React from 'react';
import PropTypes from 'prop-types';
import styles from './discussion.css';

const SectionList = props => (
  <div className={styles.container}>
    <header className={styles.header}>
      <h4>Sections</h4>
    </header>
    <aside className={styles.main}>
      <ul className={styles.list}>
        {
            props.sections.map(section => (
            <li key={section.id} className={styles.item}>
              <a
                onClick={() => props.onSectionClick(section.id)}
                className={section.active ? styles.sectionActive : styles.section}
              >
                <div className={styles.label}>{section.id}</div>
                <div className={styles.sectionInner}>
                  <div className={styles.range}>{section.start} - {section.end}</div>
                  <div>{section.comments.length} <i className="far fa-comments" /></div>
                </div>
              </a>
            </li>
          ))
        }
      </ul>
    </aside>
  </div>
);

SectionList.propTypes = {
  sections: PropTypes.array.isRequired,
  onSectionClick: PropTypes.func.isRequired,
}

export default SectionList;
