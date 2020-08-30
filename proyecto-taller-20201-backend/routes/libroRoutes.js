'use strict'

// cargamos el modelo express para poder crear rutas
var express  = require('express');

//cargamos el controlador
var libroController = require('../controllers/libroController');

//llamamos al router
var api = express.Router();

//Guardar libros
api.post('/guardarLibro', libroController.guardarLibro);

//MOSTRAR todos los libros
api.get('/todosLibros', libroController.todosLibro);

//Buscar parametros
api.get('/buscarlibro', libroController.buscarLibro);

//Modificar
api.put('/ModificarLibro/:id', libroController.modificarLibro);

//ELIMINAR
api.delete('/Eliminarlibro/:id', libroController.eliminarLibro);

//exportamos la configuracion
module.exports = api;