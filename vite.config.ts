import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

// @ts-ignore
import styledComponentsCheck from './scripts/styled-components-check.js';

// Извлекаем порт из переменных окружения или используем значение по умолчанию
const getPortFromBaseUrl = (baseUrl: string): number => {
  try {
    const url = new URL(baseUrl);
    return parseInt(url.port) || 3000;
  } catch {
    return 3000;
  }
};

const port = getPortFromBaseUrl(process.env.VITE_API_URL || 'http://localhost:3000');
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), styledComponentsCheck()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        legacy: false,
        outputStyle: 'compressed',
        sourceMap: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/applications': path.resolve(__dirname, './src/applications'),
      '@/config': path.resolve(__dirname, './src/config'),
      '@/constants': path.resolve(__dirname, './src/constants'),
      '@/elements': path.resolve(__dirname, './src/elements'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/layouts': path.resolve(__dirname, './src/layouts'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/scripts': path.resolve(__dirname, './scripts'),
    },
  },
  server: {
    port,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Отключаем sourcemap для продакшена
    minify: 'terser', // Используем terser для лучшей минификации
    terserOptions: {
      compress: {
        drop_console: true, // Удаляем console.log
        drop_debugger: true, // Удаляем debugger
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
      },
      mangle: {
        safari10: true, // Поддержка Safari 10
      },
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        // Оптимизация чанков
        manualChunks: {
          // Вендорные библиотеки
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          // UI библиотеки (если будут добавлены)
          'ui-vendor': ['@mantine/core', '@mantine/hooks', '@mantine/form'],
        },
        // Оптимизация имен файлов
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return `images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `fonts/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    // Оптимизация размера бандла
    chunkSizeWarningLimit: 1000,
    // Включение сжатия
    reportCompressedSize: true,
    // Оптимизация для современных браузеров
    target: 'es2015',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
    // Исключаем большие зависимости из предварительной оптимизации
    exclude: ['@mantine/core', '@mantine/hooks'],
  },
  // Оптимизация для продакшена
  define: {
    __DEV__: false,
  },
  // Настройки для PWA (если понадобится)
  // pwa: {
  //   registerType: 'autoUpdate',
  //   workbox: {
  //     globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
  //   },
  // },
});
