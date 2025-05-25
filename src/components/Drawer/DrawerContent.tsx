import React, { memo } from 'react';
import { DrawerContentProps } from './types';
import { ContentContainer } from './styled';

const DrawerContent: React.FC<DrawerContentProps> = memo(({ title, description, items }) => {
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
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent; 