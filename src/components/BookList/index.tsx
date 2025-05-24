import React from 'react';
import { Table, TextInput, Button, Group, SimpleGrid, Card, Text, useMantineTheme, Alert } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { booksApi } from '@/api/books';
import { Book } from '@/types/book';
import LoadingSpinner from '@/components/LoadingSpinner';

interface BookListProps {
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onView: (book: Book) => void;
}

type SortField = 'title' | 'author' | 'year' | null;
type SortOrder = 'asc' | 'desc';

export const BookList: React.FC<BookListProps> = ({ onEdit, onDelete, onView }) => {
  const [search, setSearch] = React.useState('');
  const [sortField, setSortField] = React.useState<SortField>(null);
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('asc');
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: booksApi.getAll,
  });

  const filteredBooks = books
    .filter((book: Book) => {
      const searchLower = search.toLowerCase();
      return (
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.year.toString().includes(searchLower)
      );
    })
    .sort((a: Book, b: Book) => {
      if (!sortField) return 0;
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return ' ↕';
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const renderMobileView = () => (
    <SimpleGrid cols={1} spacing="md">
      {filteredBooks.map((book: Book) => (
        <Card key={book.id} shadow="sm" p="sm">
          <Text fw={500} size="lg" mb="xs">
            {book.title}
          </Text>
          <Text size="sm" c="gray.7" mb="xs">
            Автор: {book.author}
          </Text>
          <Text size="sm" c="gray.7" mb="md">
            Год: {book.year}
          </Text>
          <Group>
            <Button size="xs" onClick={() => onView(book)}>
              Просмотр
            </Button>
            <Button size="xs" onClick={() => onEdit(book)}>
              Редактировать
            </Button>
            <Button size="xs" color="red" onClick={() => onDelete(book.id)}>
              Удалить
            </Button>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );

  const renderDesktopView = () => (
    <Table captionSide="bottom">
      <thead>
        <tr>
          <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
            <Group gap={4}>
              Название
              <Text span c={sortField === 'title' ? 'blue' : 'gray'}>
                {getSortIndicator('title')}
              </Text>
            </Group>
          </th>
          <th onClick={() => handleSort('author')} style={{ cursor: 'pointer' }}>
            <Group gap={4}>
              Автор
              <Text span c={sortField === 'author' ? 'blue' : 'gray'}>
                {getSortIndicator('author')}
              </Text>
            </Group>
          </th>
          <th onClick={() => handleSort('year')} style={{ cursor: 'pointer' }}>
            <Group gap={4}>
              Год
              <Text span c={sortField === 'year' ? 'blue' : 'gray'}>
                {getSortIndicator('year')}
              </Text>
            </Group>
          </th>
          <th style={{ textAlign: 'right' }}>Действия</th>
        </tr>
      </thead>
      <tbody>
        {filteredBooks.map((book: Book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td style={{ textAlign: 'right' }}>
              <Group justify="flex-end">
                <Button size="xs" onClick={() => onView(book)}>
                  Просмотр
                </Button>
                <Button size="xs" onClick={() => onEdit(book)}>
                  Редактировать
                </Button>
                <Button size="xs" color="red" onClick={() => onDelete(book.id)}>
                  Удалить
                </Button>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div>
      <Group mb="md">
        <TextInput
          placeholder="Поиск по названию, автору или году"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
      </Group>

      {books.length === 0 ? (
        <Alert title="Нет книг" color="blue">
          В библиотеке пока нет книг. Добавьте первую книгу, нажав кнопку "Добавить книгу".
        </Alert>
      ) : filteredBooks.length === 0 ? (
        <Alert title="Ничего не найдено" color="yellow">
          По вашему запросу "{search}" ничего не найдено. Попробуйте изменить параметры поиска.
        </Alert>
      ) : (
        <Table.ScrollContainer minWidth="100%" maxHeight={300} p="xs">
          {isMobile ? renderMobileView() : renderDesktopView()}
        </Table.ScrollContainer>
      )}
    </div>
  );
};
