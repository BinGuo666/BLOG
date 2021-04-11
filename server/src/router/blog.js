const { getList, getDetail, newBlog, updateBlog, delBlog } = require('./../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

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
    switch(req.path) {
      case '/api/blog/new' :
        msg = new SuccessModel(newBlog(req.body))
        break
      case '/api/blog/update':
         data = updateBlog(req.body)
        if (data) {
          msg = new SuccessModel(data)
        } else {
          msg = new ErrorModel(data)
        }
        break  
      case '/api/blog/delete':
         data = delBlog(req.body)
        if (data) {
          msg = new SuccessModel(data)
        } else {
          msg = new ErrorModel(data)
        }
      break  
    }
    return msg
  }
}

module.exports = handleBlogRouter