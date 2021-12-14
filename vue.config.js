// const target = 'http://zhy1024.cn'
const target = 'http://82.157.75.247:6081'
// const target = 'http://192.168.3.56:8080'
module.exports = {
  devServer: {
    port: 2000,
    host: '0.0.0.0',
    proxy: {
      '/music|auth|sys': {
        target,
        changeOrigin: true,
        pathRewrite: {

        }
      }
    }
  }
}