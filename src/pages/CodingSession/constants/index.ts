import { Section } from '../types';

export const FUNCTIONALITY_SECTION: Section = {
  title: 'Базовая функциональность',
  description: 'В течение этого времени необходимо реализовать следующие компоненты и функции:',
  items: [
    { text: 'Фиксированная главная навигация (React Router)' },
    { text: 'Прокручиваемый контент' },
    { text: 'Таблица с данными' },
    { text: 'Функционал сортировки' },
    { text: 'Пагинация' },
    { text: 'Выдвижная панель (Drawer)' },
  ],
};

export const TECHNICAL_REQUIREMENTS: Section = {
  title: 'Технические требования',
  items: [
    { text: 'React 18 или выше' },
    { text: 'React Router для навигации' },
    { text: 'TypeScript для типизации' },
    { text: 'UI библиотека с поддержкой сортируемых и пагинируемых таблиц' },
    { text: 'Styled Components (предпочтительно)' },
  ],
};

export const CODE_REQUIREMENTS: Section = {
  title: 'Важные замечания',
  description:
    'На этом этапе не следует уделять много внимания стилизации. Основной фокус должен быть на функциональности и архитектуре кода.',
  items: [
    { text: 'Хорошо структурирован' },
    { text: 'Легко поддерживаем' },
    { text: 'Масштабируем' },
    { text: 'Готов к расширению новыми функциями' },
  ],
};
