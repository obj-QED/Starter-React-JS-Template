module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Правила для импортов
    'import/order': [
      'error',
      {
        groups: [
          // React и React DOM
          ['^react$', '^react-dom$'],
          // Внешние библиотеки
          '^@?\\w',
          // Внутренние импорты
          '^@/(.*)$',
          // Относительные импорты
          '^\\.\\./',
          '^\\./',
          // Стили
          '^.+\\.s?css$',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    // Запрет неиспользуемых импортов
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    // Запрет дублирования импортов
    'import/no-duplicates': 'error',
    // Требование расширений файлов
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // Правила для React
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    // Правила для TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
  },
}; 