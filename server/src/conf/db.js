const env = process.env.NODE_ENV

let MYSQL_CONF // 数据库配置

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'myblog'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'ss8682258',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}