const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (res) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      return resolve({})
    }

    if (req.headers['content-type'] !== 'application/json') {
      return resolve({})
    }
  })
  return promise
}

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')

  req.path = req.url.split('?')[0]
  req.query = querystring.parse(req.url.split('?')[1])

  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return
  }
  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(
      JSON.stringify(userData)
    )
    return
  }
  res.writeHead(404, {'Content-type': 'text/plain'})
  res.write('408 Not Found\n')
  res.end()
}

module.exports =  serverHandle