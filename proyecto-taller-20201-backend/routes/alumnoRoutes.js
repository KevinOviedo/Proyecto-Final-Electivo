'use strict'

// cargamos el modelo express para poder crear rutas
var express  = require('express');

//cargamos el controlador
var alumnoController = require('../controllers/alumnoController');

//llamamos al router
var api = express.Router();

//Guardar libros
api.post('/guardarAlumno', alumnoController.guardarAlumno);

api.get('/todosAlumnos', alumnoController.todosalumnos);

api.delete('/EliminarAlumno/:id', alumnoController.eliminarAlumno);


//exportamos la configuracion
module.exports = api;