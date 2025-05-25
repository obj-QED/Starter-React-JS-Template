import React, { useMemo, useCallback, memo } from 'react';
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

const SORT_INDICATORS = {
  asc: ' ↑',
  desc: ' ↓',
  default: ' ↕',
} as const;

const BookList: React.FC<BookListProps> = memo(({ onEdit, onDelete, onView }) => {
  const [search, setSearch] = React.useState('');
  const [sortField, setSortField] = React.useState<SortField>(null);
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('asc');
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: booksApi.getAll,
  });

  const handleSort = useCallback((field: SortField) => {
    setSortField((prevField) => {
      if (prevField === field) {
        setSortOrder((prevOrder) => prevOrder === 'asc' ? 'desc' : 'asc');
        return field;
      }
      setSortOrder('asc');
      return field;
    });
  }, []);

  const getSortIndicator = useCallback((field: SortField) => {
    if (sortField !== field) return SORT_INDICATORS.default;
    return SORT_INDICATORS[sortOrder];
  }, [sortField, sortOrder]);

  const filteredBooks = useMemo(() => {
    const searchLower = search.toLowerCase();
    
    return books
      .filter((book: Book) => (
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.year.toString().includes(searchLower)
      ))
      .sort((a: Book, b: Book) => {
        if (!sortField) return 0;
        
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        return sortOrder === 'asc' 
          ? aValue > bValue ? 1 : -1
          : aValue < bValue ? 1 : -1;
      });
  }, [books, search, sortField, sortOrder]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const renderBookActions = useCallback((book: Book) => (
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
  ), [onView, onEdit, onDelete]);

  const renderBookCard = useCallback((book: Book) => (
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
      {renderBookActions(book)}
    </Card>
  ), [renderBookActions]);

  const renderBookRow = useCallback((book: Book) => (
    <tr key={book.id}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.year}</td>
      <td style={{ textAlign: 'right' }}>
        <Group justify="flex-end">
          {renderBookActions(book)}
        </Group>
      </td>
    </tr>
  ), [renderBookActions]);

  const renderTableHeader = useCallback(() => (
    <tr>
      {(['title', 'author', 'year'] as const).map((field) => (
        <th key={field} onClick={() => handleSort(field)} style={{ cursor: 'pointer' }}>
          <Group gap={4}>
            {field === 'title' ? 'Название' : field === 'author' ? 'Автор' : 'Год'}
            <Text span c={sortField === field ? 'blue' : 'gray'}>
              {getSortIndicator(field)}
            </Text>
          </Group>
        </th>
      ))}
      <th style={{ textAlign: 'right' }}>Действия</th>
    </tr>
  ), [handleSort, getSortIndicator, sortField]);

  const renderMobileView = useCallback(() => (
    <SimpleGrid cols={1} spacing="md">
      {filteredBooks.map(renderBookCard)}
    </SimpleGrid>
  ), [filteredBooks, renderBookCard]);

  const renderDesktopView = useCallback(() => (
    <Table captionSide="bottom">
      <thead>
        {renderTableHeader()}
      </thead>
      <tbody>
        {filteredBooks.map(renderBookRow)}
      </tbody>
    </Table>
  ), [filteredBooks, renderTableHeader, renderBookRow]);

  const renderContent = useMemo(() => {
    if (books.length === 0) {
      return (
        <Alert title="Нет книг" color="blue">
          В библиотеке пока нет книг. Добавьте первую книгу, нажав кнопку "Добавить книгу".
        </Alert>
      );
    }

    if (filteredBooks.length === 0) {
      return (
        <Alert title="Ничего не найдено" color="yellow">
          По вашему запросу "{search}" ничего не найдено. Попробуйте изменить параметры поиска.
        </Alert>
      );
    }

    return (
      <Table.ScrollContainer minWidth="100%" maxHeight={300} p="xs">
        {isMobile ? renderMobileView() : renderDesktopView()}
      </Table.ScrollContainer>
    );
  }, [books.length, filteredBooks.length, search, isMobile, renderMobileView, renderDesktopView]);

  const renderSearch = useMemo(() => {
    if (books.length === 0) return null;

    return (
      <Group mb="md">
        <TextInput
          placeholder="Поиск по названию, автору или году"
          value={search}
          onChange={handleSearchChange}
          style={{ flex: 1 }}
        />
      </Group>
    );
  }, [books.length, search, handleSearchChange]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {renderSearch}
      {renderContent}
    </div>
  );
});

BookList.displayName = 'BookList';

export { BookList };
