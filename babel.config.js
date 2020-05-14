module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true,
      // style: (name) => `${name}/style/less`, // 自定义主题用这个
    }, 'vant']
  ]
}
