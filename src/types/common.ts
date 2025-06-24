import { ReactNode } from 'react';

// Общие типы для styled-components
export interface BaseStyledProps {
  className?: string;
}

// Общие типы для компонентов
export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}

// Общие типы для layout компонентов
export interface LayoutProps extends BaseComponentProps {
  header?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
}

// Общие типы для страниц
export interface PageProps extends BaseComponentProps {
  title?: string;
  description?: string;
}
