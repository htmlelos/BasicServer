const User = require('./model')

const listUser = () => {
  return async (req, res) => {
    const {fields} = req.body
    try {
      const users = await User.find({}).select(fields)
      res.status(200).json({success: true, users})
    } catch (error) {
      res.status(404).json({success: false, message: 'No se encontraron usuario'})
    }

  };
}

const getUser = () =>  {
  return async (req, res)  => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId, 'name password email')
      res.status(200).json(user)
    } catch (error) {
      res.status(404).json({success: false, message: 'Usuario no encontrado'})
    }
  };
}

const createUser = () => {
  return async (req, res) => {
    const user = new User(req.body)
    try {
      const newUser = await user.save()
      res.status(201).json({success: true})
    } catch (error) {
      res.status(404).json({success: false,message: 'El usuario no pudo ser creado'})
    }

  }
}

const updateUser = () => {
  return async (req, res) => {
    const { userId } = req.params
    const user = req.body
    try {
      const newUser = await User.findByIdAndUpdate(userId, user, {})
      res.status(200).json({success: true})
    } catch (error) {
      res.status(404).json({success: false, message: 'No se pudo actualizar el usuario'})
    }
  }
}

const deleteUser = () => {
  return async (req, res) => {
    const { userId } = req.params
    try {
      const user = await User.findByIdAndRemove(userId)
      res.status(200).json({success: true})
    } catch (error) {
      res.status(404).json({success: false})
    }

  }
}

module.exports = {
  listUser,
  getUser,
  createUser,
  updateUser,
  deleteUser
}