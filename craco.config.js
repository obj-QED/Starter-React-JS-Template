const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig, { env, paths }) => {
      // Оптимизация для production сборки
      if (env === 'production') {
        // Включаем tree shaking
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          usedExports: true,
          sideEffects: true,
        };

        // Анализ бандла (только если установлена переменная ANALYZE)
        if (process.env.ANALYZE) {
          webpackConfig.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: 'server',
              analyzerPort: 8888,
            })
          );
        }
      }

      // Оптимизация для development сборки
      if (env === 'development') {
        webpackConfig.devtool = 'eval-source-map';
      }

      return webpackConfig;
    },
  },
  style: {
    sass: {
      loaderOptions: {
        // Оптимизация SASS
        sassOptions: {
          outputStyle: 'compressed',
          includePaths: [path.resolve(__dirname, 'src/assets/scss')],
        },
      },
    },
    modules: {
      localIdentName: '[local]_[hash:base64:5]',
    },
  },
  babel: {
    plugins: [
      // Оптимизация styled-components
      [
        'babel-plugin-styled-components',
        {
          displayName: false,
          pure: true,
        },
      ],
    ],
  },
};
