function ping() {
    return function (req, res) {
        res.json({ message: 'pong' });
    };
}

module.exports = {
    ping
}