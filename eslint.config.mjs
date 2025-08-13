import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '*.min.js',
      '*.bundle.js',
      'public/',
      '*.config.js',
      '*.config.mjs',
      'vite.config.ts',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        navigator: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      react,
      'react-hooks': reactHooks,

    },
    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'warn',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-*',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@mantine/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: 'styled-components',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
      'import/no-duplicates': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'eslint-comments/no-unused-disable': 'off',
      'eslint-comments/disable-enable-pair': 'off',

    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.eslint.json',
          projectFolder: import.meta.dirname,
        },
      },
    },
  },
];
