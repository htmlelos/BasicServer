const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const Common = require('./src/common/controller')
const User = require('./src/user/controller')

const server = express()
const port = process.env.REST_PORT||3000;

mongoose.connect('mongodb://localhost/musica', function(err) {
    if (err) {
        console.log('No puedo conectar a la base de datos')
        process.exit(1)
    }
    console.log('Base de datos conectada')
})

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())

server.get('/', Common.ping())

server.post('/users', User.listUser())

server.get('/users/:userId', User.getUser())

server.post('/users', User.createUser())

server.listen(port, function() {
    console.log('Servidor ejecutandose en el puerto ' + port);
})

