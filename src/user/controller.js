const User = require('./model')

function listUser() {
  return function (req, res) {
    const {
      fields
    } = req.body
    User.find({}).select(fields).exec(
      function (err, users) {
        if (err) {
          res.status(404).json({
            success: false
          });
        }
        res.status(200).json({
          success: true,
          users
        });
      }
    );
  };
}

function getUser() {
  return function (req, res) {
    const userId = req.params.userId;
    User.findById(userId, 'name password email', function (err, user) {
      if (err) {
        res.status(404).json({
          success: false
        });
      }
      res.status(200).json(user);
    });
  };
}

function createUser() {
  return function (req, res) {
    const newUser = req.body
    const user = new User(newUser)
    user.save(function (err) {
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
    User.remove({_id: userId}, function (err) {
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