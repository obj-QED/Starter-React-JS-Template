import React, { JSX } from 'react';
import { DrawerProps } from './types';
import {
  Overlay,
  DrawerContainer,
  CloseButton,
  DrawerContentContainer
} from './styled';

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  width = '300px',
}): JSX.Element => {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <DrawerContainer isOpen={isOpen} position={position} width={width}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <DrawerContentContainer>{children}</DrawerContentContainer>
      </DrawerContainer>
    </>
  );
};

export default Drawer; 