import React from 'react';
import MainLayout from '@/layouts/layout';
import DrawerExample from '@/components/Drawer/DrawerExample';
import Table from '@/components/Table/index';
import { FUNCTIONALITY_SECTION, TECHNICAL_REQUIREMENTS, CODE_REQUIREMENTS } from './constants';
import { Title, Section, SectionTitle, Text, List, ListItem, ExampleSection } from './styled';

const CodingSession: React.FC = () => {
  const renderSection = (section: typeof FUNCTIONALITY_SECTION) => (
    <Section>
      <SectionTitle>{section.title}</SectionTitle>
      {section.description && <Text>{section.description}</Text>}
      <List>
        {section.items.map((item, index) => (
          <ListItem key={index}>{item.text}</ListItem>
        ))}
      </List>
    </Section>
  );

  return (
    <MainLayout>
      <div className="container">
        <Title>Сессия Кодирования</Title>

        {renderSection(FUNCTIONALITY_SECTION)}
        {renderSection(TECHNICAL_REQUIREMENTS)}
        {renderSection(CODE_REQUIREMENTS)}

        <ExampleSection>
          <Table />
        </ExampleSection>

        <ExampleSection>
          <SectionTitle>Пример выдвижной панели (Drawer)</SectionTitle>
          <Text>Ниже представлен пример реализации выдвижной панели с возможностью открытия как слева, так и справа:</Text>
          <DrawerExample />
        </ExampleSection>
      </div>
    </MainLayout>
  );
};

export default CodingSession;
