export const ROUTES = {
  HOME: '/',
  CODING_SESSION: '/code',
} as const;

export const ROUTE_TITLES = {
  [ROUTES.HOME]: 'Главная',
  [ROUTES.CODING_SESSION]: 'Code',
} as const;
