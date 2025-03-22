import React, { JSX } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES, ROUTE_TITLES } from '@/constants/routes';

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.light};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const NavList = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Navigation: React.FC = (): JSX.Element => {
  return (
    <Nav>
      <div className="container">
        <NavList>
          {Object.entries(ROUTES).map(([key, path]) => (
            <li key={path}>
              <NavLink to={path}>{ROUTE_TITLES[path]}</NavLink>
            </li>
          ))}
        </NavList>
      </div>
    </Nav>
  );
};

export default Navigation;
