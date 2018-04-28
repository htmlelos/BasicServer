const User = require('./model')

function listUser() {
  return function (req, res) {
    const {fields} = req.body
    User
      .find({})
      .select(fields)
      .then(users => {res.status(200).json({ success: true, users })})
      .catch(err => { res.status(404).json({ success: false, message: 'No se encontraron usuarios' })})
  };
}

function getUser() {
  return function (req, res) {
    const { userId } = req.params;
    User
      .findById(userId, 'name password email')
      .then(user => {res.status(200).json(user)})
      .catch(err => {res.status(404).json({success: false, message: 'Usuario no encontrado'})})
  };
}

function createUser() {
  return function (req, res) {
    const user = new User(req.body)
    user
      .save()
      .then(user => {res.status(201).json({success: true});})
      .catch(err => {res.status(404).json({success: false,message: 'El usuario no pudo ser creado'})})
  }
}

function updateUser() {
  return function (req, res) {
    const { userId } = req.params
    const user = req.body
    User.findByIdAndUpdate(userId, user, {})
      .then(user => { res.status(200).json({success: true})})
      .catch(err => {res.status(404).json({success: false, message: 'No se pudo actualizar el usuario'})})
  }
}

function deleteUser() {
  return function (req, res) {
    const { userId } = req.params
    User.findByIdAndRemove(userId)
      .then(user => { res.status(200).json({success: true})})
      .catch(err => {res.status(404).json({success: false})})
  }
}

module.exports = {
  listUser,
  getUser,
  createUser,
  updateUser,
  deleteUser
}