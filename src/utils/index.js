// 设置页面title名
function setPageTitle (title) {
  window.document.title = title
}

function toggleLoginState (state) { // 切换登录状态
  sessionStorage.isLogin = state
}

export default {
  setPageTitle,
  toggleLoginState,
}
