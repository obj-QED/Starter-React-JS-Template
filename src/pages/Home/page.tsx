import React, { memo, useCallback, useMemo } from 'react';
import { Container, Title, Button, Modal, Paper } from '@mantine/core';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { BookList } from '@/components/BookList';
import { BookForm } from '@/components/BookForm';
import { booksApi } from '@/api/books';
import { Book, CreateBookDto } from '@/types/book';

const HomePage: React.FC = memo(() => {
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

  const handleCreate = useCallback((values: CreateBookDto) => {
    createMutation.mutate(values);
  }, [createMutation]);

  const handleEdit = useCallback((values: CreateBookDto) => {
    if (selectedBook) {
      updateMutation.mutate({ ...values, id: selectedBook.id });
    }
  }, [selectedBook, updateMutation]);

  const handleDelete = useCallback((id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту книгу?')) {
      deleteMutation.mutate(id);
    }
  }, [deleteMutation]);

  const handleCreateModalOpen = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const handleCreateModalClose = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  const handleEditModalOpen = useCallback((book: Book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  }, []);

  const handleEditModalClose = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  const handleViewModalOpen = useCallback((book: Book) => {
    setSelectedBook(book);
    setIsViewModalOpen(true);
  }, []);

  const handleViewModalClose = useCallback(() => {
    setIsViewModalOpen(false);
  }, []);

  const bookViewContent = useMemo(() => {
    if (!selectedBook) return null;
    
    return (
      <Paper p="md">
        <h3>{selectedBook.title}</h3>
        <p>Автор: {selectedBook.author}</p>
        <p>Год публикации: {selectedBook.year}</p>
        <p>Описание: {selectedBook.description}</p>
      </Paper>
    );
  }, [selectedBook]);

  return (
    <Container size="xl" p={0}>
      <Title order={1} mb="xl">
        Управление книгами
      </Title>

      <Button onClick={handleCreateModalOpen} mb="xl">
        Добавить книгу
      </Button>

      <BookList
        onEdit={handleEditModalOpen}
        onDelete={handleDelete}
        onView={handleViewModalOpen}
      />

      <Modal opened={isCreateModalOpen} onClose={handleCreateModalClose} title="Добавить книгу">
        <BookForm onSubmit={handleCreate} onCancel={handleCreateModalClose} />
      </Modal>

      <Modal opened={isEditModalOpen} onClose={handleEditModalClose} title="Редактировать книгу">
        {selectedBook && <BookForm initialValues={selectedBook} onSubmit={handleEdit} onCancel={handleEditModalClose} />}
      </Modal>

      <Modal opened={isViewModalOpen} onClose={handleViewModalClose} title="Информация о книге">
        {bookViewContent}
      </Modal>
    </Container>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
