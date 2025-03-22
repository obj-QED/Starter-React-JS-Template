export const config = {
  app: {
    name: 'My React App',
    version: '1.0.0',
    description: 'React application with TypeScript and styled-components',
  },
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
    timeout: 5000,
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
  },
  localStorage: {
    prefix: 'my-react-app_',
    tokenKey: 'token',
    themeKey: 'theme',
    languageKey: 'language',
  },
} as const;

export type Config = typeof config; 