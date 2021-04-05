const { getList, getDetail, newBlog, updateBlog, delBlog } = require('./../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method // GET POST

  // 获取接口
  if (method === 'GET') {
    let msg
    switch(req.path) {
      case '/api/blog/list' :
        msg = new SuccessModel(getList(req.query.author))
        break
      case '/api/blog/detail' :
        msg = new SuccessModel(getDetail(req.query.author))
        break  
    }
    return msg
  }
  if (method === 'POST') {
    let msg
    switch(req.path) {
      case '/api/blog/new' :
        msg = new SuccessModel(newBlog(req.body))
        break
      case '/api/blog/update':
        const data = updateBlog(req.body)
        if (data) {
          msg = new SuccessModel(data)
        } else {
          msg = new ErrorModel(data)
        }
        break  
      case '/api/blog/delete':
          const data = delBlog(req.body)
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