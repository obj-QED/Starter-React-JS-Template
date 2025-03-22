export interface TableItem {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export interface TableProps {
  data: TableItem[];
  loading?: boolean;
  pageSize?: number;
} 