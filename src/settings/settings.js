const bodyParser = require('body-parser')
const cors = require('cors')

const settings = server => {
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())
  server.use(cors())
}

module.exports = settings