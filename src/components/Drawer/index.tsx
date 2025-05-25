import React, { memo, useCallback, JSX } from 'react';
import { DrawerProps } from './types';
import {
  Overlay,
  DrawerContainer,
  CloseButton,
  DrawerContentContainer
} from './styled';

const Drawer: React.FC<DrawerProps> = memo(({
  isOpen,
  onClose,
  children,
  position = 'right',
  width = '300px',
}): JSX.Element => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={handleClose} />
      <DrawerContainer $isOpen={isOpen} $position={position} $width={width}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <DrawerContentContainer>{children}</DrawerContentContainer>
      </DrawerContainer>
    </>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer; 