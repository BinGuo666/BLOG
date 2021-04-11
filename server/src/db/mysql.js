const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)


con.connect()
console.log('开始连接数据库...')

function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      resolve(result)
    })
  })
}

function close() {
  con.connect()
}

module.exports = {
  exec,
  close
}
