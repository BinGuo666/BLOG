const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = 'select * from blog where 1=1'
  author && (sql += ` and author = '${author}'`)
  keyword && (sql += ` and title like '%${keyword}%'`)
  sql += ' order by createtime desc;'
  return exec(sql)
}
const getDetail = (id) => {
  const sql = `select * from blog where id = '${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}
const updateBlog = (blogData = {}) => {
  return true
}
const delBlog = (blogData = {}) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}