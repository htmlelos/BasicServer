const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const User = require('./src/models/user')

const server = express()
const port = process.env.REST_PORT||3000;

mongoose.connect('mongodb://localhost/musica', function(err) {
    if (err) {
        console.log('No puedo conectar a la base de datos')
        process.exit()
    }
    console.log('Base de datos conectada')
})


server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.get('/', function(req, res) {
    res.json({message: 'Pong'})
})

server.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res.status(404).json({success: false})
        }
        res.status(200).json({success: true, users})
    })
})

server.get('/users/:userId', function(req, res) {
    const userId = req.params.userId    
    User.findById(userId, function(err, user) {
        if (err) {
            res.status(404).json({success:false})
        }
        res.status(200).json(user)
    })
})

server.post('/users', function(req, res) {
    const newUser = req.body
    console.log('NEW_USER', req.body);
    const user = new User(newUser)
    user.save(function(err) {
        if (err) {
            res.status(401).json({success:false})
        }
        res.status(200).json({success:true})
    })
})

server.listen(port, function() {
    console.log('Servidor ejecutandose en el puerto ' + port);
})