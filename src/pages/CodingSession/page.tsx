import React from 'react';
import styled from 'styled-components';

const CodingSessionContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CodingSession: React.FC = () => {
  return (
    <CodingSessionContainer>
      <PageTitle>Сессия кодинга</PageTitle>
      <p>Здесь будет ваша сессия кодинга.</p>
    </CodingSessionContainer>
  );
};

export default CodingSession;
