const common = require('./common')
const user = require('./user')

const router = server => {
    server.use('/', common)
    server.use('/', user)
}

module.exports = router
