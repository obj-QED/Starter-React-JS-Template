import { memo } from 'react';

import { NavLink } from 'react-router-dom';

import { ROUTES, ROUTE_TITLES } from '@/constants/routes';

const Navigation = memo(() => {
  return (
    <nav>
      <NavLink to={ROUTES.HOME}>{ROUTE_TITLES[ROUTES.HOME]}</NavLink>
      <NavLink to={ROUTES.CODING_SESSION}>
        {ROUTE_TITLES[ROUTES.CODING_SESSION]}
      </NavLink>
    </nav>
  );
});

export default Navigation;
