import chokidar from 'chokidar';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Пути к файлам
const SCSS_DIR = path.join(__dirname, '../assets/scss');

// Функция для генерации темы
const generateTheme = () => {
  console.log('🔄 Генерация темы...');
  exec('node src/config/theme-converter.js', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Ошибка генерации темы:', error);
      return;
    }
    if (stderr) {
      console.error('⚠️ Предупреждения:', stderr);
    }
    console.log('✅ Тема сгенерирована:', stdout);
  });
};

// Настраиваем наблюдатель
const watcher = chokidar.watch(SCSS_DIR, {
  ignored: [
    /(^|[\/\\])\../, // игнорируем скрытые файлы
    '**/node_modules/**',
    '**/dist/**',
  ],
  persistent: true,
  ignoreInitial: false,
  depth: 10,
});

// Обработчики событий
watcher
  .on('add', (path) => {
    console.log(`📝 Файл ${path} добавлен`);
    generateTheme();
  })
  .on('change', (path) => {
    console.log(`📝 Файл ${path} изменен`);
    generateTheme();
  })
  .on('unlink', (path) => {
    console.log(`🗑️ Файл ${path} удален`);
    generateTheme();
  })
  .on('ready', () => {
    console.log('👀 Отслеживание изменений в файлах SCSS...');
    // Генерируем тему при запуске
    generateTheme();
  });
