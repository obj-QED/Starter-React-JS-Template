import { ReactNode } from 'react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'left' | 'right';
  width?: string;
}

export interface DrawerContentProps {
  title: string;
  description: string;
  items: string[];
} 