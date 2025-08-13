#!/usr/bin/env node

const chokidar = require('chokidar');
const { execSync } = require('child_process');
const path = require('path');

// Файлы для отслеживания
const patterns = ['src/**/*.{ts,tsx,js,jsx}', 'src/**/*.{json,css,scss,md}'];

// Исключения
const ignored = [
  'node_modules/**',
  'dist/**',
  'build/**',
  'coverage/**',
  '*.min.js',
  '*.bundle.js',
  '*.d.ts',
];

console.log('🚀 Запуск автоматического форматирования...');
console.log('📁 Отслеживаемые файлы:', patterns.join(', '));
console.log('❌ Исключения:', ignored.join(', '));
console.log('💡 Нажмите Ctrl+C для остановки\n');

// Функция для форматирования файла
function formatFile(filePath) {
  try {
    const ext = path.extname(filePath);

    if (['.ts', '.tsx'].includes(ext)) {
      // Для TypeScript файлов запускаем ESLint и Prettier
      execSync(`npx eslint "${filePath}" --fix`, { stdio: 'inherit' });
      execSync(`npx prettier --write "${filePath}"`, { stdio: 'inherit' });
    } else {
      // Для остальных файлов только Prettier
      execSync(`npx prettier --write "${filePath}"`, { stdio: 'inherit' });
    }

    console.log(`✅ Отформатирован: ${filePath}`);
  } catch (error) {
    console.error(`❌ Ошибка форматирования ${filePath}:`, error.message);
  }
}

// Настройка отслеживания файлов
const watcher = chokidar.watch(patterns, {
  ignored,
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 300,
    pollInterval: 100,
  },
});

// Обработчики событий
watcher
  .on('add', filePath => {
    console.log(`📄 Добавлен файл: ${filePath}`);
    formatFile(filePath);
  })
  .on('change', filePath => {
    console.log(`📝 Изменен файл: ${filePath}`);
    formatFile(filePath);
  })
  .on('unlink', filePath => {
    console.log(`🗑️  Удален файл: ${filePath}`);
  })
  .on('error', error => {
    console.error('❌ Ошибка отслеживания:', error);
  })
  .on('ready', () => {
    console.log('👀 Отслеживание файлов активно...\n');
  });

// Обработка завершения процесса
process.on('SIGINT', () => {
  console.log('\n🛑 Остановка отслеживания...');
  watcher.close();
  process.exit(0);
});
