const http = require('http')
const serverHandle = require('../app')
const RORT = 8000

const server = http.createServer(serverHandle)
server.listen(RORT)
