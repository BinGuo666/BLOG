const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method // GET POST

  if (method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
      data.username && res.setHeader('Set-Cookie', `username=${data.username};path=/;httpOnly`)
      return data ? new SuccessModel(data) : new ErrorModel('登录失败')
    })
  }

  if (method === 'GET' && req.path === '/api/user/login-test') {
    return Promise.resolve(req.cookie.username ? new SuccessModel({
      username: req.cookie.username
    }) : new ErrorModel('尚未登录'))
  }
}

module.exports = handleUserRouter