const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  css: {
    loaderOptions: {
      /* // 自定义主题
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#9da8ef',
            'border-color': '#d874b7',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // hack: `true; @import "your-less-file-path.less";`,
          },
        },
      }, */
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 16,
            propList: ['*'],
            // selectorBlackList: ["van-"],
          }),
        ],
      },
    },
  },
}
