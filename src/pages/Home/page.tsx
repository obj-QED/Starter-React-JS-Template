import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Добро пожаловать!</Title>
      <p>Это главная страница вашего приложения.</p>
    </HomeContainer>
  );
};

export default Home;
