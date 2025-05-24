import React from 'react';
import { TextInput, NumberInput, Textarea, Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Book, CreateBookDto } from '@/types/book';

interface BookFormProps {
  initialValues?: Book;
  onSubmit: (values: CreateBookDto) => void;
  onCancel: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<CreateBookDto>({
    initialValues: initialValues || {
      title: '',
      author: '',
      year: new Date().getFullYear(),
      description: '',
    },
    validate: {
      title: (value: string) => (!value ? 'Название обязательно' : null),
      author: (value: string) => (!value ? 'Автор обязателен' : null),
      year: (value: number) => (!value ? 'Год обязателен' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label="Название"
          placeholder="Введите название книги"
          {...form.getInputProps('title')}
        />
        <TextInput
          label="Автор"
          placeholder="Введите имя автора"
          {...form.getInputProps('author')}
        />
        <NumberInput
          label="Год публикации"
          placeholder="Введите год публикации"
          min={1800}
          max={new Date().getFullYear()}
          {...form.getInputProps('year')}
        />
        <Textarea
          label="Описание"
          placeholder="Введите описание книги"
          minRows={4}
          {...form.getInputProps('description')}
        />
        <Button.Group>
          <Button type="submit" color="blue">
            {initialValues ? 'Сохранить' : 'Создать'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Отмена
          </Button>
        </Button.Group>
      </Stack>
    </form>
  );
}; 