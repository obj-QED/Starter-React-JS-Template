module.exports = {
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: true, // Добавляет имя компонента к классу
        fileName: true,    // Добавляет имя файла к классу
        meaninglessFileNames: ['index', 'styles'], // Игнорируем общие имена файлов
        namespace: 'app'   // Добавляет пространство имен к классам
      }
    ]
  ]
}; 