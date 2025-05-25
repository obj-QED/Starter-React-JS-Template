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

  const showNotification = useCallback((title: string, message: string) => {
    notifications.show({
      title,
      message,
      color: 'green',
    });
  }, []);

  const createMutation = useMutation({
    mutationFn: booksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setIsCreateModalOpen(false);
      showNotification('Успех', 'Книга успешно создана');
    },
  });

  const updateMutation = useMutation({
    mutationFn: booksApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setIsEditModalOpen(false);
      showNotification('Успех', 'Книга успешно обновлена');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: booksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      showNotification('Успех', 'Книга успешно удалена');
    },
  });

  const handleCreate = useCallback(
    (values: CreateBookDto) => {
      createMutation.mutate(values);
    },
    [createMutation],
  );

  const handleEdit = useCallback(
    (values: CreateBookDto) => {
      if (selectedBook) {
        updateMutation.mutate({ ...values, id: selectedBook.id });
      }
    },
    [selectedBook, updateMutation],
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm('Вы уверены, что хотите удалить эту книгу?')) {
        deleteMutation.mutate(id);
      }
    },
    [deleteMutation],
  );

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

  const renderModals = useMemo(() => {
    const modals = [];

    if (isCreateModalOpen) {
      modals.push(
        <Modal key="create" opened={isCreateModalOpen} onClose={handleCreateModalClose} title="Добавить книгу">
          <BookForm onSubmit={handleCreate} onCancel={handleCreateModalClose} />
        </Modal>
      );
    }

    if (isEditModalOpen && selectedBook) {
      modals.push(
        <Modal key="edit" opened={isEditModalOpen} onClose={handleEditModalClose} title="Редактировать книгу">
          <BookForm initialValues={selectedBook} onSubmit={handleEdit} onCancel={handleEditModalClose} />
        </Modal>
      );
    }

    if (isViewModalOpen) {
      modals.push(
        <Modal key="view" opened={isViewModalOpen} onClose={handleViewModalClose} title="Информация о книге">
          {bookViewContent}
        </Modal>
      );
    }

    return modals;
  }, [
    isCreateModalOpen,
    isEditModalOpen,
    isViewModalOpen,
    selectedBook,
    handleCreateModalClose,
    handleEditModalClose,
    handleViewModalClose,
    handleCreate,
    handleEdit,
    bookViewContent,
  ]);

  return (
    <Container size="xl" p={0}>
      <Title order={1} mb="xl">
        Управление книгами
      </Title>

      <Button onClick={handleCreateModalOpen} mb="xl">
        Добавить книгу
      </Button>

      <BookList onEdit={handleEditModalOpen} onDelete={handleDelete} onView={handleViewModalOpen} />

      {renderModals}
    </Container>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
