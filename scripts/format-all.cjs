#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Запуск форматирования всех файлов...\n');

try {
  // Форматируем TypeScript/JavaScript файлы с ESLint и Prettier
  console.log('📝 Форматирование TypeScript/JavaScript файлов...');
  try {
    execSync('yarn lint:fix', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  ESLint завершился с ошибками, но продолжаем...');
  }

  // Форматируем все файлы с Prettier
  console.log('🎨 Форматирование всех файлов с Prettier...');
  execSync('yarn format', { stdio: 'inherit' });

  console.log('\n✅ Все файлы отформатированы успешно!');
} catch (error) {
  console.error('\n❌ Ошибка форматирования:', error.message);
  process.exit(1);
}
