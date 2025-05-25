import React, { memo } from 'react';
import { LayoutContainer } from './styled';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = memo(({ children }) => {
  return <LayoutContainer className="layout">{children}</LayoutContainer>;
});

MainLayout.displayName = 'MainLayout';

export default MainLayout;
