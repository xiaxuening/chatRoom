module.exports = {
  devServer: {
    port: 2000,
    proxy: {
      '/music': {
        target: 'http://192.168.3.56:8080',
        changeOrigin: true,
        pathRewrite: {

        }
      }
    }
  }
}