'use strict'

// cargamos el modelo express para poder crear rutas
var express  = require('express');

//cargamos el controlador
var prestamoController = require('../controllers/prestamoController');

//llamamos al router
var api = express.Router();

//Guardar libros
api.post('/guardarPrestamo', prestamoController.guardarPrestamo);

api.get('/buscarPrestamoPorLibro', prestamoController.buscarPrestamoPorLibro);

api.get('/buscarPrestamoPorAlumno', prestamoController.buscarPrestamoPorAlumno);

api.get('/todosPrestamos', prestamoController.todosPrestamos);
//exportamos la configuracion
module.exports = api;