const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const path = require('path')
const fs = require('fs')

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      return resolve({})
    }

    if (req.headers['content-type'] !== 'application/json') {
      return resolve({})
    }

    let postData = ''

    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return 
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 请求返回首页
  if (req.path='/' && req.method === 'GET') {
    res.setHeader('Content-type', 'text/html')
    html= fs.readFileSync(path.join(__dirname, '../fontend/views/login.html'));
    res.end(html)
    return
  }


  res.setHeader('Content-type', 'application/json')
  req.path = req.url.split('?')[0]
  req.query = querystring.parse(req.url.split('?')[1])

  getPostData(req).then(postData => {
    req.body = postData

    const blogPro = handleBlogRouter(req, res)
    if (blogPro) {
      blogPro.then(data => {
        res.end(JSON.stringify(data))
      })
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
  })
}

module.exports =  serverHandle