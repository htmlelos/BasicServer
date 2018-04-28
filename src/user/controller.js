const User = require('./model')

function listUser() {
  return function (req, res) {
    const {
      fields
    } = req.body
    User
      .find({})
      .select(fields)
      .then(users => {
        res.status(200).json({
          success: true,
          users
        })
      })
      .catch(err => {
        res.status(404).json({
          success: false,
          message: 'No se encontraron usuarios'
        })
      })
  };
}

function getUser() {
  return function (req, res) {
    const userId = req.params.userId;
    User
      .findById(userId, 'name password email')
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(404).json({
          succes: false,
          message: 'Usuario no encontrado'
        })
      })
  };
}

function createUser() {
  return function (req, res) {
    const newUser = req.body
    const user = new User(newUser)
    user
      .save()
      .then(user => {
        res.status(201).json({
          success: true
        });
      })
      .catch(err => {
        res.status(401).json({
          succes: false,
          message: 'El usuario no pudo ser creado'
        })
      })
  }
}

function updateUser() {
  return function (req, res) {
    const userId = req.params.userId
    const user = req.body
    User.findByIdAndUpdate(userId, user, {}, function (err, user) {
      if (err) {
        res.status(401).json({
          success: false
        })
      }
      res.status(200).json({
        success: true
      })
    })
  }
}

function deleteUser() {
  return function (req, res) {
    const userId = req.params.userId;
    User.remove({
      _id: userId
    }, function (err) {
      if (err) {
        res.status(401).json({
          success: false
        })
      }
      res.status(200).json({
        success: true
      })
    });
  }
}

module.exports = {
  listUser,
  getUser,
  createUser,
  updateUser,
  deleteUser
}