module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import "@/styles.scss";`,
      },
    },
  },
};
