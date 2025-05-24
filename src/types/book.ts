export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  description: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  year: number;
  description: string;
}

export interface UpdateBookDto extends Partial<CreateBookDto> {
  id: string;
} 