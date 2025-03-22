import React from 'react';
import styled from 'styled-components';
import { DrawerProps } from './types/';

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const DrawerContainer = styled.div<{ isOpen: boolean; position: string; width: string }>`
  position: fixed;
  top: 0;
  ${({ position }) => position}: 0;
  width: ${({ width }) => width};
  height: 100%;
  background-color: white;
  box-shadow: ${({ position }) =>
    position === 'left' ? '2px 0 5px rgba(0, 0, 0, 0.1)' : '-2px 0 5px rgba(0, 0, 0, 0.1)'};
  z-index: 1001;
  transform: translateX(${({ isOpen, position }) =>
    isOpen ? '0' : position === 'left' ? '-100%' : '100%'});
  transition: transform 0.3s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  
  &:hover {
    color: #333;
  }
`;

const DrawerContent = styled.div`
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
`;

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  width = '300px',
}) => {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <DrawerContainer isOpen={isOpen} position={position} width={width}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <DrawerContent>{children}</DrawerContent>
      </DrawerContainer>
    </>
  );
};

export default Drawer; 