import { memo } from 'react';

import styles from './styles.module.scss';

const LoadingSpinner = memo(() => {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloader__spinner} />
    </div>
  );
});

export default LoadingSpinner;
