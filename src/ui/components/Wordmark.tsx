import styles from './Wordmark.module.css';

export function Wordmark() {
  return (
    <div className={styles.wordmark}>
      <div className={styles.title}>
        <h1 className={styles.english}>HANG CAT</h1>
        <span className={styles.kanji} aria-hidden="true">
          吊り猫
        </span>
      </div>
      <p className={styles.tagline}>a word game</p>
    </div>
  );
}
