'use strict'


require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var libros_routes = require('./routes/libroRoutes');
var alumnos_routes = require('./routes/alumnoRoutes');
var prestamos_routes = require('./routes/prestamoRoutes');
var usuario_routes = require('./routes/usuarioRoutes');

var cors = require('cors')
app.use(cors())
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', libros_routes);
app.use('/api', alumnos_routes);
app.use('/api', prestamos_routes);
app.use('/api', usuario_routes);

mongoose.connect(`mongodb+srv://${process.env.USERBD}:${process.env.PASSBD}@${process.env.CLUSTER}?retryWrites=true&w=majority`, (err, res) => {

    if(err){
        console.log("NO CONECTA")
    }
    app.listen(5000, () => {

        console.log("Esta corriendo en puerto 5000")
    })
})