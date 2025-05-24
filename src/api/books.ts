import { Book, CreateBookDto, UpdateBookDto } from '@/types/book';

const API_URL = '/api/books';

export const booksApi = {
  getAll: async (): Promise<Book[]> => {
    const response = await fetch(API_URL);
    return response.json();
  },

  getById: async (id: string): Promise<Book> => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  },

  create: async (book: CreateBookDto): Promise<Book> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    return response.json();
  },

  update: async (book: UpdateBookDto): Promise<Book> => {
    const response = await fetch(`${API_URL}/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
  },
}; 