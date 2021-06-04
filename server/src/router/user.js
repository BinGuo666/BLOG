const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method // GET POST

  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {

      data.username && (req.session.username = data.username) && (req.session.realname = data.realname)
      set(req.sessionId, req.session)
      return data ? new SuccessModel(data) : new ErrorModel('登录失败')
    })
  }

  if (method === 'GET' && req.path === '/api/user/login-test') {
    console.log('session:', req.session)
    return Promise.resolve(req.session.username ? new SuccessModel({
      session: req.session
    }) : new ErrorModel('尚未登录'))
  }
}

module.exports = handleUserRouter