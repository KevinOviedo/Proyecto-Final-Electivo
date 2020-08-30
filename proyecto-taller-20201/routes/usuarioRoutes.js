'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var userController = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');
// var autoController = require('../controllers/autoController');

// Llamamos al router
var api = express.Router();
 
//  Guardar usuario
api.post('/registro', userController.guardar);
api.get('/usuario', userController.todos);
api.post('/usuario/validar', userController.validar);
api.post('/usuario/vigencia1', auth.isAuth,userController.validarVigenciaUsuario);

// Exportamos la confi,guración
module.exports = api;
