import styled from 'styled-components';

export const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  color: #444;
  margin-bottom: 1rem;
`;

export const Text = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  color: #666;

  &:before {
    content: '→';
    position: absolute;
    left: 0;
    color: #007bff;
  }
`;

export const ExampleSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  margin-top: 2rem;
`;
