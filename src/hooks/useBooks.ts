import { useState, useCallback } from 'react';
import { Book, CreateBookDto } from '../types/book';

export const useBooks = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [books, _] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке книг');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBook = useCallback(async (bookData: CreateBookDto) => {
    try {
      setLoading(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при добавлении книги');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
  };
};
