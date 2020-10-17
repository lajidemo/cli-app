const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const path = require('path')
const fs = require('fs')

const PATHJOIN = path.join
function resolve (dir) {
  return path.join(__dirname,dir)
}

function finder (path) {
  const files = fs.readdirSync(path)
  const directoryArr = []
  files.forEach((val) => {
    const fPath = PATHJOIN(path,val)
    const stats = fs.statSync(fPath)
    if (stats.isDirectory()) {
      directoryArr.push(val)
    };
  })
  return directoryArr
}

module.exports = {
  chainWebpack: (config) => {
    // 对src下所有文件夹设置别名
    const directoryArr = finder(resolve('./src'))
    directoryArr.forEach(val => {
      config.resolve.alias
        .set(`@${val}`,resolve(`./src/${val}`))
    })

    // 为搭配Path Autocomplete自动提醒路径插件，使用以下方法设置别名
    config.resolve.alias
      .set('@',resolve('./src'))
  },
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
            rootValue: 14,
            propList: ['*'],
            // selectorBlackList: ["van-"],
          }),
        ],
      },
    },
  },
}
