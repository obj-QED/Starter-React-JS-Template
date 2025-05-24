import React from 'react';
import { Table, TextInput, Button, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { booksApi } from '@/api/books';
import { Book } from '@/types/book';
import LoadingSpinner from '@/components/LoadingSpinner';

interface BookListProps {
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onView: (book: Book) => void;
}

export const BookList: React.FC<BookListProps> = ({ onEdit, onDelete, onView }) => {
  const [search, setSearch] = React.useState('');

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: booksApi.getAll,
  });

  const filteredBooks = books.filter((book: Book) => book.title.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Group mb="md">
        <TextInput
          placeholder="Поиск по названию"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Автор</th>
            <th>Год</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book: Book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
