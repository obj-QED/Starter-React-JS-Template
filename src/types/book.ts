export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  year: number;
  isbn: string;
  coverUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  year: number;
  description: string;
  isbn: string;
  coverUrl?: string;
}

export interface UpdateBookDto extends Partial<CreateBookDto> {
  id: string;
} 