const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: 'title',
      content: 'content',
      createTime: 123123,
      author: author
    }
  ]
}
const getDetail = (author, keyword) => {
  return [
    {
      id: 1,
      title: 'title',
      content: 'content',
      createTime: 123123,
      author: author
    }
  ]
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