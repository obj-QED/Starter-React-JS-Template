const sass = require('sass');
const fs = require('fs');
const path = require('path');

// Пути к файлам
const SCSS_THEME_PATH = path.join(__dirname, '../assets/scss/theme/_theme.scss');
const OUTPUT_THEME_PATH = path.join(__dirname, '../style/theme/styled-theme.ts');

// Функция для преобразования SCSS в JavaScript объект
function convertScssToJs(scssContent) {
  // Извлекаем значения из :export
  const exportMatch = scssContent.match(/:export\s*{([^}]+)}/);
  if (!exportMatch) return null;

  const exportContent = exportMatch[1];
  const themeObject = {};

  // Парсим экспортируемые значения
  exportContent.split(';').forEach(line => {
    const [key, value] = line.split(':').map(s => s.trim());
    if (key && value) {
      // Извлекаем категорию и имя свойства
      const match = key.match(/([a-zA-Z]+)-([a-zA-Z]+)/);
      if (match) {
        const [, category, prop] = match;
        if (!themeObject[category]) {
          themeObject[category] = {};
        }
        themeObject[category][prop] = value.replace(/['"]/g, '');
      }
    }
  });

  return themeObject;
}

// Функция для создания TypeScript файла темы
function createThemeFile(themeObject) {
  // Создаем директорию, если она не существует
  const dir = path.dirname(OUTPUT_THEME_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const themeContent = `// Этот файл автоматически сгенерирован. Не редактируйте его вручную.
import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = ${JSON.stringify(themeObject, null, 2)};

export default theme;
`;

  fs.writeFileSync(OUTPUT_THEME_PATH, themeContent);
}

// Основная функция
function convertTheme() {
  try {
    // Компилируем SCSS
    const result = sass.compile(SCSS_THEME_PATH);
    
    // Конвертируем в JavaScript объект
    const themeObject = convertScssToJs(result.css);
    
    if (themeObject) {
      // Создаем файл темы
      createThemeFile(themeObject);
      console.log('✅ Тема успешно сконвертирована');
    } else {
      console.error('❌ Не удалось найти экспортируемые значения в SCSS файле');
    }
  } catch (error) {
    console.error('❌ Ошибка при конвертации темы:', error);
  }
}

// Запускаем конвертацию
convertTheme(); 