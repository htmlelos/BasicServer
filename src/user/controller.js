const User = require('./model')

function listUser() {
    return function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                res.status(404).json({ success: false });
            }
            res.status(200).json({ success: true, users });
        });
    };
}

function getUser() {
    return function (req, res) {
        const userId = req.params.userId;
        User.findById(userId, function (err, user) {
            if (err) {
                res.status(404).json({ success: false });
            }
            res.status(200).json(user);
        });
    };
}

function createUser() {
    return function (req, res) {
        const newUser = req.body;
        console.log('NEW_USER', req.body);
        const user = new User(newUser);
        user.save(function (err) {
            if (err) {
                res.status(401).json({ success: false });
            }
            res.status(200).json({ success: true });
        });
    };
}

module.exports = {
    listUser,
    getUser,
    createUser
}