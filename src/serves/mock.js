import Mock from 'mockjs'
import commonApi from './commonApi'

Mock.setup({
  timeout: '1000-2000', // 表示响应时间介于 200 和 600 毫秒之间。默认值是'10-100'。
})
Mock.mock(commonApi.login,{
  code: '00000000',
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1,
  }],
})
