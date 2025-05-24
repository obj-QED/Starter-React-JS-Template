import React from 'react';
import { Container, Title, Button, Modal, Paper } from '@mantine/core';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { BookList } from '@/components/BookList';
import { BookForm } from '@/components/BookForm';
import { booksApi } from '@/api/books';
import { Book, CreateBookDto } from '@/types/book';

const HomePage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);

  const createMutation = useMutation({
    mutationFn: booksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setIsCreateModalOpen(false);
      notifications.show({
        title: 'Успех',
        message: 'Книга успешно создана',
        color: 'green',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: booksApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setIsEditModalOpen(false);
      notifications.show({
        title: 'Успех',
        message: 'Книга успешно обновлена',
        color: 'green',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: booksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      notifications.show({
        title: 'Успех',
        message: 'Книга успешно удалена',
        color: 'green',
      });
    },
  });

  const handleCreate = (values: CreateBookDto) => {
    createMutation.mutate(values);
  };

  const handleEdit = (values: CreateBookDto) => {
    if (selectedBook) {
      updateMutation.mutate({ ...values, id: selectedBook.id });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту книгу?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Container size="xl">
      <Title order={1} mb="xl">
        Управление книгами
      </Title>

      <Button onClick={() => setIsCreateModalOpen(true)} mb="xl">
        Добавить книгу
      </Button>

      <BookList
        onEdit={(book) => {
          setSelectedBook(book);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDelete}
        onView={(book) => {
          setSelectedBook(book);
          setIsViewModalOpen(true);
        }}
      />

      <Modal
        opened={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Добавить книгу"
      >
        <BookForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Редактировать книгу"
      >
        {selectedBook && (
          <BookForm
            initialValues={selectedBook}
            onSubmit={handleEdit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      <Modal
        opened={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Информация о книге"
      >
        {selectedBook && (
          <Paper p="md">
            <h3>{selectedBook.title}</h3>
            <p>Автор: {selectedBook.author}</p>
            <p>Год публикации: {selectedBook.year}</p>
            <p>Описание: {selectedBook.description}</p>
          </Paper>
        )}
      </Modal>
    </Container>
  );
};

export default HomePage;
