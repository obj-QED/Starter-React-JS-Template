import React, { memo } from 'react';
import { Group, Title, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const Navigation: React.FC = memo(() => {
  return (
    <Group justify="space-between" px="md" h="100%">
      <Title order={3}>Book Manager</Title>
      <Group>
        <Button component={Link} to="/" variant="subtle">
          Главная
        </Button>
      </Group>
    </Group>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
