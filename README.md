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

# Настройки Styled Components
# true - включить ThemeProvider для Styled Components
# false - отключить ThemeProvider для Styled Components
VITE_USE_STYLED_COMPONENTS=true
```

### Запуск

```bash
# Установка зависимостей
yarn install

# Запуск в режиме разработки
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Вариации приложений

Приложение поддерживает несколько вариаций в зависимости от настроек:

### 1. **Default** (VITE_USE_MANTINE_THEME=false, VITE_USE_STYLED_COMPONENTS=false)

- Простое приложение без Mantine
- Без styled-components
- Только SCSS стили

### 2. **Styled Components** (VITE_USE_MANTINE_THEME=false, VITE_USE_STYLED_COMPONENTS=true)

- Простое приложение без Mantine
- С styled-components и ThemeProvider
- SCSS стили

### 3. **Mantine** (VITE_USE_MANTINE_THEME=true)

- Приложение с Mantine UI компонентами
- Styled-components опционально (VITE_USE_STYLED_COMPONENTS)
- SCSS стили

## Особенности

- **Mantine UI** - основная UI библиотека (опционально)
- **Styled Components** - для кастомных стилей (опционально)
- **TypeScript** - типизация
- **SCSS** - для глобальных стилей
- **React Router** - маршрутизация
- **Единая система управления темами** - все настройки в `src/config/theme.ts`

## Структура проекта

```
src/
├── applications/  # Вариации приложений
│   ├── index.tsx  # Главный файл выбора вариации
│   ├── default/   # Простое приложение
│   ├── mantine/   # Mantine приложение
│   └── styled-components/ # Styled Components приложение
├── components/    # Переиспользуемые компоненты
├── pages/         # Страницы приложения
├── config/        # Конфигурация (включая темы)
├── assets/        # Статические ресурсы
│   ├── scss/      # Глобальные SCSS стили
│   └── styles/    # Styled Components стили
│       └── components/ # Styled Components
├── components/    # Переиспользуемые компоненты
│   └── */         # Каждый компонент содержит свои стили
│       ├── style.scss      # Обычные SCSS
│       ├── styles.module.scss # CSS Modules
│       └── README.md       # Документация
├── utils/         # Утилиты
├── types/         # Типы TypeScript
└── main.tsx       # Точка входа приложения
```

## Архитектура приложения

### Точка входа (`src/main.tsx`)

- Инициализация React Query
- Импорт SCSS стилей

### Система вариаций (`src/applications/`)

- **`index.tsx`** - главный файл выбора вариации на основе переменных окружения
- **`default/`** - простое приложение без Mantine
- **`mantine/`** - приложение с Mantine UI (само настраивает провайдеры)
- **`styled-components/`** - приложение с styled-components

### Система стилей

- **Компонентные стили** - каждый компонент содержит свои стили
  - `style.scss` - обычные SCSS стили
  - `styles.module.scss` - CSS Modules
  - `*.styled.ts` - styled-components (в `src/assets/styles/components/`)
- **Глобальные стили** - `src/assets/scss/`
- **Vite плагин** - автоматически проверяет styled-components при сохранении файлов
- **Простота использования** - компоненты пишутся в одном стиле, без условной логики

### Управление темами

Все настройки темы находятся в `src/config/theme.ts`:

- `themeConfig` - конфигурация приложения и переменные окружения
- `lightTheme` / `darkTheme` - Mantine темы
- `useTheme()` - хук для управления темами

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
