const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.log(err)
})

function set (key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  get(key).then(e => console.log('获取', e))
}

function get (key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        resolve(null)
        return
      }

      try {
        resolve(JSON.parse(val))
      } catch (err) {
        console.log(err)
      }
    })
  })
}

module.exports = {
  set, 
  get
}