import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DEFAULT_PAGE_SIZE } from './constants/';
import { TableItem, TableProps } from './types/types';

const columns: ColumnsType<TableItem> = [
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
  {
    title: 'Теги',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <>
        {tags.map((tag) => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
];

const DataTable: React.FC<TableProps> = ({ data, loading = false, pageSize = DEFAULT_PAGE_SIZE }) => {
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        pageSize: currentPageSize,
        showSizeChanger: true,
        showTotal: (total) => `Всего ${total} записей`,
        onShowSizeChange: (_, size) => setCurrentPageSize(size),
      }}
    />
  );
};

export default DataTable;
