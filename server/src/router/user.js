const handleUserRouter = (req, res) => {
  const method = req.method // GET POST

  if (method === 'POST') {
    let msg
    switch(req.path) {
      case '/api/blog/login' :
        msg = '登录接口'
        break
    }
    return msg
  }
}

module.exports = handleUserRouter