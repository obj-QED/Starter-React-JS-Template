import React, { JSX } from 'react';
import styled from 'styled-components';
import DataTable from './DataTable';
import { TABLE_DATA } from './constants';

interface TitleProps {
  className?: string;
}

const Title = styled.h2<TitleProps>`
  color: #333;
  margin-bottom: 1.5rem;
`;

const Table: React.FC = (): JSX.Element => {
  return (
    <>
      <Title>Пример таблицы с сортировкой и пагинацией</Title>
      <DataTable data={TABLE_DATA} />
    </>
  );
};

export default Table;
