import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES, ROUTE_TITLES } from '@/constants/routes';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}20;
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const Navigation: React.FC = () => {
  return (
    <Nav>
      <StyledNavLink to={ROUTES.HOME}>{ROUTE_TITLES[ROUTES.HOME]}</StyledNavLink>
      <StyledNavLink to={ROUTES.CODING_SESSION}>{ROUTE_TITLES[ROUTES.CODING_SESSION]}</StyledNavLink>
    </Nav>
  );
};

export default Navigation;
