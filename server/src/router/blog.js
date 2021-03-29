const { getList } = require('./../controller/blog')
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
        msg = '获取详情'
        break  
    }
    return msg
  }
  if (method === 'POST') {
    let msg
    switch(req.path) {
      case '/api/blog/new' :
        msg = '新建接口'
        break
      case '/api/blog/update' :
        msg = '更新接口'
        break  
      case '/api/blog/delete' :
        msg = '删除接口'
        break  
    }
    return msg
  }
}

module.exports = handleBlogRouter