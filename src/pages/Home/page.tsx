import { memo } from 'react';

import { LoadingSpinner } from '@/components';

const Home = memo(() => {
  return (
    <div>
      <LoadingSpinner />
      <h1>Добро пожаловать!</h1>
      <p>Это главная страница вашего приложения.</p>
    </div>
  );
});

export default Home;
