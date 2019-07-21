module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
