/* eslint-disable */
const devServer = require('./devServer.config')
const webpackconfig = {
  // lintOnSave: false,
  publicPath: './',
  chainWebpack: (config) => {
    config.module
      .rule('css')
      .test(/\.css$/)
      .oneOf('vue')
      .resourceQuery(/\?vue/)
      .use('px2rem')
      .loader('px2rem-loader')
      .end()
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        prependData: `@import "~@/styles/variables.sass";`,
      },
      scss: {
        prependData: `@import "~@/styles/variables.scss";`,
      },
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '_',
      },
    },
  },
  devServer: {
    open: true,
    port: 8080, // 端口号
    host: '0.0.0.0',
    proxy: 'http://127.0.0.1:8080/', // 配置跨域处理,只有一个代理
    // proxy: {
    //   ...devServer,
    // },
    https: false,
  },
}

// if (process.env.VUE_CLI_MODE !== "production") {
//   webpackconfig.devServer = {
//   //   // 设置代理
//   //   // host: '192.168.1.8', //ip地址 为方便手机调试
//   //   // port: 8085, //端口
//     open: true, //自动打开浏览器
//   //   proxy: {
//   //     // "/stage-api": {
//   //     //   target: "http://xx.xx.xx.xxx:xxx", // 要访问的接口域名
//   //     //   secure: false,
//   //     //   changeOrigin: true,
//   //     // },
//   //   },
//   };
// }
module.exports = webpackconfig
