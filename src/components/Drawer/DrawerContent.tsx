import React from 'react';
import { DrawerContentProps } from './types';
import { ContentContainer } from './styled';

const DrawerContent: React.FC<DrawerContentProps> = ({ title, description, items }) => {
  return (
    <ContentContainer>
      <h2>{title}</h2>
      <p>{description}</p>
      <ul>
        {items.map((item) => (
          <li key={`${title}-${item}`}>{item}</li>
        ))}
      </ul>
    </ContentContainer>
  );
};

export default DrawerContent; 