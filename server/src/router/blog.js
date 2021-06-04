const { getList, getDetail, newBlog, updateBlog, delBlog } = require('./../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 登录校验
const loginCheck = req => {
  return Promise.resolve(req.session.username ? undefined : new ErrorModel('尚未登录'))
}


const handleBlogRouter = (req, res) => {
  const method = req.method // GET POST

  // 获取接口
  if (method === 'GET') {
    switch(req.path) {
      case '/api/blog/list' :
        return getList(req.query.author, req.query.keyword).then(data => {
          return new SuccessModel(data)
        })
      case '/api/blog/detail' :
        return getDetail(req.query.id).then(data => {
          return new SuccessModel(data)
        }) 
    }
  }
  if (method === 'POST') {
    let msg,data
    if(!loginCheck(req)) return loginCheck
    req.body.author = req.session.username
    switch(req.path) {
      case '/api/blog/new' :
        return newBlog(req.body).then(data => {
          return new SuccessModel(data)
        })
        break
      case '/api/blog/update':
        return updateBlog(5, req.body).then(data => {
          return data ? new SuccessModel(data) : new ErrorModel(data)
        })
        break  
      case '/api/blog/delete':
        return delBlog(3, 'zhao').then(data => {
          return data ? new SuccessModel(data) : new ErrorModel(data)
        })
      break  
    }
    return msg
  }
}

module.exports = handleBlogRouter