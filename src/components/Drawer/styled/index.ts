import styled from 'styled-components';

interface OverlayProps {
  $isOpen: boolean;
}

interface DrawerContainerProps extends OverlayProps {
  $position: 'left' | 'right';
  $width: string;
}

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1000;
`;

export const DrawerContainer = styled.div<DrawerContainerProps>`
  position: fixed;
  top: 0;
  ${({ $position }) => $position}: 0;
  width: ${({ $width }) => $width};
  height: 100%;
  background-color: white;
  box-shadow: ${({ $position }) => ($position === 'left' ? '2px 0 5px rgba(0, 0, 0, 0.1)' : '-2px 0 5px rgba(0, 0, 0, 0.1)')};
  transform: translateX(${({ $isOpen, $position }) => ($isOpen ? '0' : $position === 'left' ? '-100%' : '100%')});
  transition: transform 0.3s ease;
  z-index: 1001;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  color: #666;
  transition: color 0.2s ease;

  &:hover {
    color: #333;
  }
`;

export const DrawerContentContainer = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

export const ContentContainer = styled.div`
  h2 {
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    color: #666;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const ExampleContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

export const Button = styled.button.attrs({
  className: 'custom-button',
})`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
