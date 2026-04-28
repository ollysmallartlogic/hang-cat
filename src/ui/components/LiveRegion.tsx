import { useEffect, useState } from 'react';
import { subscribe } from '../announce';
import styles from './LiveRegion.module.css';

export function LiveRegion() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    return subscribe(setMessage);
  }, []);

  return (
    <div
      className={styles.region}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}
