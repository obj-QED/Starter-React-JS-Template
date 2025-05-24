import React from 'react';
import { Center, Loader } from '@mantine/core';

const LoadingSpinner: React.FC = () => {
  return (
    <Center h="100vh">
      <Loader size="xl" />
    </Center>
  );
};

export default LoadingSpinner; 