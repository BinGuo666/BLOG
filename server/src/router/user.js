const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method // GET POST

  if (method === 'POST') {
    let msg
    switch(req.path) {
      case '/api/blog/login':
        const { username, password } = req.body
        const data = login(username, password)
        if (data) {
          msg = new SuccessModel(data)
        } else {
          msg = new ErrorModel('登录失败')
        }
        break
    }
    return msg
  }
}

module.exports = handleUserRouter