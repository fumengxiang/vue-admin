/**
 * 过滤空格，* 等特殊字符的函数
 */
export function stripscript (s) {
  var pattern = new RegExp("[`~!@#$^&*()=|{ }':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？%\"]")
  var rs = ''
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '')
  }
  return rs
}
// 验证用户名（邮箱格式）
export function validateUsername1 (username) {
  const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return reg.test(username)
}
// 验证6-20位的字母+数字的密码
export function validatePassword1 (password) {
  const reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
  return reg.test(password)
}
// 验证验证码（字母或数字）
export function valdateCode1 (code) {
  const reg = /^[a-z0-9]{6}$/
  return reg.test(code)
}
