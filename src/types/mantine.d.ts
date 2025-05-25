import '@mantine/core';

declare module '@mantine/core' {
  export interface MantineTheme {
    transitionTimingFunction: string;
    transitionDuration: string;
  }
} 