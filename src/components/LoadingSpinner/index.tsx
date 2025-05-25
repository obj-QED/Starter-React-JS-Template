import React, { memo } from 'react';
import { Center, Loader } from '@mantine/core';

const LoadingSpinner: React.FC = memo(() => {
  return (
    <Center mih="50dvh" h="100%">
      <Loader size="xl" />
    </Center>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner; 