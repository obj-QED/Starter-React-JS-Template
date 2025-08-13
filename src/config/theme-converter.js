import fs from 'fs';
import path from 'path';
import sass from 'sass';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Пути к файлам
const SCSS_THEME_DIR = path.join(__dirname, '../assets/scss/theme');
const SCSS_THEME_PATH = path.join(SCSS_THEME_DIR, '_theme.scss');
const OUTPUT_THEME_PATH = path.join(
  __dirname,
  '../utils/generate-styled-theme.ts'
);

// Функция для компиляции SCSS
function compileScss() {
  try {
    const result = sass.compile(SCSS_THEME_PATH, {
      loadPaths: [SCSS_THEME_DIR],
      style: 'expanded',
    });
    return result.css;
  } catch (error) {
    console.error('❌ Ошибка компиляции SCSS:', error);
    return null;
  }
}

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
        // Проверяем, что значение не пустое и не undefined
        const cleanValue = value.replace(/['"]/g, '').trim();
        if (
          cleanValue &&
          cleanValue !== 'undefined' &&
          cleanValue !== 'null' &&
          cleanValue !== ''
        ) {
          if (!themeObject[category]) {
            themeObject[category] = {};
          }
          themeObject[category][prop] = cleanValue;
        }
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
    // Проверяем существование файла темы
    if (!fs.existsSync(SCSS_THEME_PATH)) {
      console.error(`❌ Файл темы не найден: ${SCSS_THEME_PATH}`);
      return;
    }

    // Компилируем SCSS
    const compiledCss = compileScss();
    if (!compiledCss) return;

    // Конвертируем в JavaScript объект
    const themeObject = convertScssToJs(compiledCss);

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
