import { memo } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = memo(({ children }: MainLayoutProps) => (
  <div className='layout'>{children}</div>
));

export default MainLayout;
