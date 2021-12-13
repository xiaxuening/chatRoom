module.exports = {
  devServer: {
    port: 2000,
    host: '0.0.0.0',
    proxy: {
      '/music|auth|sys': {
        target: 'http://192.168.3.56:8080',
        changeOrigin: true,
        pathRewrite: {

        }
      }
    }
  }
}