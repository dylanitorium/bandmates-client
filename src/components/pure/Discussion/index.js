import React from 'react';
import PropTypes from 'prop-types';
import styles from './discussion.css';

const Discussion = props => (
  <div className={styles.container}>
    <h4>Sections</h4>
    <ul className={styles.list}>
      {
          props.sections.map(section => (
          <li key={section.id} className={styles.item}>
            <a
              onClick={() => props.onSectionClick(section.id)}
              className={section.active ? styles.sectionActive : styles.section}
            >
              <div className={styles.range}>{section.start} - {section.end}</div>
            </a>
          </li>
        ))
      }
    </ul>
  </div>
);

Discussion.propTypes = {
  sections: PropTypes.array.isRequired,
  onSectionClick: PropTypes.func.isRequired,
}

export default Discussion;
