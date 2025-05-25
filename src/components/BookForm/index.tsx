import React, { memo, useCallback, useMemo } from 'react';
import { TextInput, NumberInput, Textarea, Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Book, CreateBookDto } from '@/types/book';

interface BookFormProps {
  initialValues?: Book;
  onSubmit: (values: CreateBookDto) => void;
  onCancel: () => void;
}

const DEFAULT_VALUES: CreateBookDto = {
  title: '',
  author: '',
  year: new Date().getFullYear(),
  description: '',
  isbn: '',
  coverUrl: '',
};

const VALIDATION_RULES = {
  title: (value: string) => (!value ? 'Название обязательно' : null),
  author: (value: string) => (!value ? 'Автор обязателен' : null),
  year: (value: number) => (!value ? 'Год обязателен' : null),
} as const;

const FORM_FIELDS_CONFIG = [
  {
    name: 'title',
    component: TextInput,
    label: 'Название',
    placeholder: 'Введите название книги',
  },
  {
    name: 'author',
    component: TextInput,
    label: 'Автор',
    placeholder: 'Введите имя автора',
  },
  {
    name: 'year',
    component: NumberInput,
    label: 'Год публикации',
    placeholder: 'Введите год публикации',
    min: 1800,
    max: new Date().getFullYear(),
  },
  {
    name: 'description',
    component: Textarea,
    label: 'Описание',
    placeholder: 'Введите описание книги',
    minRows: 4,
  },
] as const;

const BookForm: React.FC<BookFormProps> = memo(({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<CreateBookDto>({
    initialValues: initialValues || DEFAULT_VALUES,
    validate: VALIDATION_RULES,
  });

  const handleSubmit = useCallback((values: CreateBookDto) => {
    onSubmit(values);
  }, [onSubmit]);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const formFields = useMemo(() => 
    FORM_FIELDS_CONFIG.map(({ name, component: Component, ...props }) => ({
      component: Component,
      props: {
        ...props,
        ...form.getInputProps(name),
      },
    })),
    [form]
  );

  const renderFormFields = useCallback(() => (
    formFields.map(({ component: Component, props }, index) => (
      <Component key={index} {...props} />
    ))
  ), [formFields]);

  const submitButtonText = useMemo(() => 
    initialValues ? 'Сохранить' : 'Создать',
    [initialValues]
  );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        {renderFormFields()}
        <Button.Group>
          <Button type="submit" color="blue">
            {submitButtonText}
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            Отмена
          </Button>
        </Button.Group>
      </Stack>
    </form>
  );
});

BookForm.displayName = 'BookForm';

export { BookForm };
