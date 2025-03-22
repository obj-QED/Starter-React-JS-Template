import React from 'react';
import styled from 'styled-components';
import DataTable from './DataTable';
import { TABLE_DATA } from './constants';

const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;

const Table: React.FC = () => {
  return (
    <>
      <Title>Пример таблицы с сортировкой и пагинацией</Title>
      <DataTable data={TABLE_DATA} />
    </>
  );
};

export default Table;
