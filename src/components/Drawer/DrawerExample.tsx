import React, { JSX, useState } from 'react';
import Drawer from './index';
import DrawerContent from './DrawerContent';
import { LEFT_DRAWER_CONTENT, RIGHT_DRAWER_CONTENT } from './constants';
import { ExampleContainer, Button } from './styled';

const DrawerExample: React.FC = (): JSX.Element => {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState<boolean>(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState<boolean>(false);

  return (
    <ExampleContainer>
      <Button onClick={() => setIsLeftDrawerOpen(true)}>Открыть левую панель</Button>
      <Button onClick={() => setIsRightDrawerOpen(true)}>Открыть правую панель</Button>

      <Drawer isOpen={isLeftDrawerOpen} onClose={() => setIsLeftDrawerOpen(false)} position="left">
        <DrawerContent {...LEFT_DRAWER_CONTENT} />
      </Drawer>

      <Drawer isOpen={isRightDrawerOpen} onClose={() => setIsRightDrawerOpen(false)} position="right">
        <DrawerContent {...RIGHT_DRAWER_CONTENT} />
      </Drawer>
    </ExampleContainer>
  );
};

export default DrawerExample;
