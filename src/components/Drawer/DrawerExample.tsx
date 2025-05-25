import React, { memo, useCallback, useState, JSX } from 'react';
import Drawer from './index';
import DrawerContent from './DrawerContent';
import { LEFT_DRAWER_CONTENT, RIGHT_DRAWER_CONTENT } from './constants';
import { ExampleContainer, Button } from './styled';

const DrawerExample: React.FC = memo((): JSX.Element => {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState<boolean>(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState<boolean>(false);

  const handleLeftDrawerOpen = useCallback(() => {
    setIsLeftDrawerOpen(true);
  }, []);

  const handleRightDrawerOpen = useCallback(() => {
    setIsRightDrawerOpen(true);
  }, []);

  const handleLeftDrawerClose = useCallback(() => {
    setIsLeftDrawerOpen(false);
  }, []);

  const handleRightDrawerClose = useCallback(() => {
    setIsRightDrawerOpen(false);
  }, []);

  return (
    <ExampleContainer>
      <Button onClick={handleLeftDrawerOpen}>Открыть левую панель</Button>
      <Button onClick={handleRightDrawerOpen}>Открыть правую панель</Button>

      <Drawer isOpen={isLeftDrawerOpen} onClose={handleLeftDrawerClose} position="left">
        <DrawerContent {...LEFT_DRAWER_CONTENT} />
      </Drawer>

      <Drawer isOpen={isRightDrawerOpen} onClose={handleRightDrawerClose} position="right">
        <DrawerContent {...RIGHT_DRAWER_CONTENT} />
      </Drawer>
    </ExampleContainer>
  );
});

DrawerExample.displayName = 'DrawerExample';

export default DrawerExample;
