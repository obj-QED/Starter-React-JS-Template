import { http, HttpResponse } from 'msw';
import { Book } from '@/types/book';

const books: Book[] = [
  {
    id: '1',
    title: 'Война и мир',
    author: 'Лев Толстой',
    year: 1869,
    description: 'Роман-эпопея, описывающий русское общество в эпоху войн против Наполеона.',
  },
  {
    id: '2',
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    year: 1866,
    description: 'Психологический роман о преступлении и его последствиях.',
  },
];

export const handlers = [
  http.get('/favicon.ico', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('/api/books', () => {
    return HttpResponse.json(books);
  }),

  http.get('/api/books/:id', ({ params }) => {
    const book = books.find((b) => b.id === params.id);
    if (!book) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(book);
  }),

  http.post('/api/books', async ({ request }) => {
    const newBook = await request.json() as Omit<Book, 'id'>;
    const book: Book = {
      id: String(books.length + 1),
      ...newBook,
    };
    books.push(book);
    return HttpResponse.json(book);
  }),

  http.put('/api/books/:id', async ({ params, request }) => {
    const updates = await request.json() as Partial<Book>;
    const index = books.findIndex((b) => b.id === params.id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    books[index] = { ...books[index], ...updates };
    return HttpResponse.json(books[index]);
  }),

  http.delete('/api/books/:id', ({ params }) => {
    const index = books.findIndex((b) => b.id === params.id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    books.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
]; 