import React, { memo } from 'react';
import { Center, Loader } from '@mantine/core';

const LoadingSpinner: React.FC = memo(() => {
  return (
    <Center h="100vh">
      <Loader size="xl" />
    </Center>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner; 