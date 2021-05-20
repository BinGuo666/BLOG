const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const path = require('path')
const fs = require('fs')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const SESSION_DATA = {}

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
  // if (req.path='/' && req.method === 'GET') {
  //   res.setHeader('Content-type', 'text/html')
  //   html= fs.readFileSync(path.join(__dirname, '../fontend/views/login.html'));
  //   res.end(html)
  //   return
  // }


  res.setHeader('Content-type', 'application/json')
  req.path = req.url.split('?')[0]
  req.query = querystring.parse(req.url.split('?')[1])

  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1]
    req.cookie[key] = val
  })

  let needSetCookie = false
  let userId = req.cookie.userId
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${Data.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]


  getPostData(req).then(postData => {
    req.body = postData

    const blogPro = handleBlogRouter(req, res)
    if (blogPro) {
      blogPro.then(data => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${data.userId};path=/;httpOnly;expires=${getCookieExpires()}`)
        }

        res.end(JSON.stringify(data))
      })
      return
    }
    

    const userData = handleUserRouter(req, res)
    if (userData) {
      userData.then(data => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${data.userId};path=/;httpOnly;expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(data))
      })
      return
    }

    res.writeHead(404, {'Content-type': 'text/plain'})
    res.write('408 Not Found\n')
    res.end()
  })
}

module.exports =  serverHandle