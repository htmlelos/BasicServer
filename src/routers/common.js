const Common = require('../common/controller')
const router = require('express').Router()

router.route('/ping').get(Common.ping())

module.exports = router