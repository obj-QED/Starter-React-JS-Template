const path = require('path');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
      },
    },
  },
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          quietDeps: true,
          logger: {
            warn: function (message) {
              if (!message.includes('Deprecation')) {
                console.warn(message);
              }
            },
            debug: function () {},
          },
        },
      },
    },
    modules: {
      localIdentName: '[local]_[hash:base64:5]',
    },
  },
};
