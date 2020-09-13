/**
 * 工具
 */
// 设置页面title名
function setPageTitle (title) {
  window.document.title = title
}

function toggleLoginState (state) { // 切换登录状态
  sessionStorage.isLogin = state
}

function setLoginTime (time) { // 存储登录的时间戳
  sessionStorage.loginTime = time
}

export default {
  setPageTitle,
  toggleLoginState,
  setLoginTime,
}
