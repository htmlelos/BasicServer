const express = require('express')
const mongoose = require('mongoose')

const server = express()

const settings = require('./src/settings/settings')
const router = require('./src/routers/router')

const port = process.env.REST_PORT||3000;

mongoose.connect('mongodb://localhost/musica', function(err) {
    if (err) {
        console.log('No puedo conectar a la base de datos')
        process.exit(1)
    }
    console.log('Base de datos conectada')
})

settings(server)

// router.route('/ping').get
router(server)

server.listen(port, function() {
    console.log('Servidor ejecutandose en el puerto ' + port);
})

