# React App

Это React приложение с поддержкой Mantine UI и Styled Components.

## Настройка

### Переменные окружения

Создайте файл `.env` в корне проекта со следующими настройками:

```env
# Настройки приложения
VITE_API_URL=http://localhost:3000

# Настройки темы
# true - использовать Mantine тему для цветов
# false - использовать Styled Components тему для цветов
VITE_USE_MANTINE_THEME=true
```

### Запуск

```bash
# Установка зависимостей
yarn install

# Запуск в режиме разработки
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Особенности

- **Mantine UI** - основная UI библиотека
- **Styled Components** - для кастомных стилей
- **TypeScript** - типизация
- **SCSS** - для глобальных стилей
- **React Router** - маршрутизация
- **Единая система управления темами** - все настройки в `src/config/theme.ts`

## Структура проекта

```
src/
├── components/     # Переиспользуемые компоненты
├── pages/         # Страницы приложения
├── config/        # Конфигурация (включая темы)
├── assets/        # Статические ресурсы
└── utils/         # Утилиты
```

## Управление темами

Все настройки темы находятся в `src/config/theme.ts`:

- `themeConfig` - конфигурация приложения и переменные окружения
- `lightTheme` / `darkTheme` - Mantine темы
- `getTitleColor()` - функция для получения цвета заголовка
- `useTheme()` - хук для управления темами

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
