const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // The address of your backend server
        changeOrigin: true,
        pathRewrite: { '^/api': '' },  // Optional: rewrite path
      }
    }
  }
})
