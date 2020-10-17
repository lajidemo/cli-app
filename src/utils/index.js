/**
 * 工具
 */
const phoneReg = /^(13[0-9]|14[57]|15[0-9]|18[0-9])\d{8}$/

// 设置页面title名
function setPageTitle (title) {
  window.document.title = title
}

// 存储cookie
function setCookie (cookie) {
  localStorage.cookieStr = cookie
}

// 手机号正则
function phoneTest (phone) {
  return phoneReg.test(phone)
}

export default {
  setPageTitle,
  setCookie,
  phoneTest,
}
