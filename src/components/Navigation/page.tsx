import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  padding: 1rem 0;
  background-color: #f8f9fa;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
`;

const Navigation: React.FC = () => {
  return (
    <Nav>
      <div className="container">
        <NavList>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/code">Код</Link>
          </li>
        </NavList>
      </div>
    </Nav>
  );
};

export default Navigation;
