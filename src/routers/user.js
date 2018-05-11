const User = require('../user/controller')
const router = require('express').Router()

router.route('/user')
  .post(User.createUser())

router.route('/user/:userId')
  .get(User.getUser())
  .put(User.updateUser())
  .delete(User.deleteUser())

router.route('/users')
  .post(User.listUser())  

module.exports = router