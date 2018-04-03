import React from 'react';
import styles from './discussion.css';

const Discussion = props => (
  <div className={styles.container}>
    <ul className={styles.list}>
      {
          props.sections.map(section => (
          <li className={styles.section}>
            <div className={styles.range}>{section.start} - {section.end}</div>
          </li>
        ))
      }
    </ul>
  </div>
);

export default Discussion;
