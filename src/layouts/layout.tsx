import React from 'react';
import { LayoutContainer } from './styled';
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <LayoutContainer className="layout">{children}</LayoutContainer>;
};

export default MainLayout;
