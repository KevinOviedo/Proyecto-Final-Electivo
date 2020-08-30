'use strict'
const bcrypt = require('bcrypt-nodejs')
// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Usuario = require('../models/usuario.js');
const servicio = require('../services/index')
const nodemailer = require('nodemailer');

var trasporter = nodemailer.createTransport({
    service: "Gmail",
    auth:{
        user: process.env.MAIL,
        pass: process.env.PASSMAIL
    }
});


function guardar(req, res) {

    // Devolvemos una respuesta en JSON

    let User = new Usuario();

    User.nombre = req.body.nombre;
    User.mail = req.body.mail;
    User.pass = req.body.pass;

    Usuario.findOne({ mail: req.body.mail }, function(err, user) {
        if(err) {
            return res.status(500).send(`Error en la base de datos> ${err}`)
        }
        if (user) {
              return res.status(404).send({ 'mensaje':'El correo ya esta en uso' });
        }else {
            User.save((err, usuariostore) => {

                if (err) res.status(500).send(`Error base de datos> ${err}`)
        
                res.status(200).send({ "mensaje": "creado correctamente", usuarios: usuariostore })
        
            })
        
                let option = {
                        to: User.mail,
                        subject: "Correo Confirmacion Nueva Cuenta",
                        html: `<h1> ${User.mail} </h1> <br>
                                <h1> ${User.pass} </h1>`

                }
                    trasporter.sendMail(option, function(error, info){
                        if(error){
                        console.log(error);
                    } else {
                        res.status(200).send({mensaje: 'email enviado'})
                    }
                })
        }   
     }); 

}

function validar(req, res) {
    var password = req.body.pass;
    Usuario.findOne({'mail': req.body.mail}, (err, user) => {
        if (err) return res.status(500).send({ mensaje: 'error al realizar la peticion' })
        if (!user) return res.status(401).send({ mensaje: 'Error usuario no existe' })

        bcrypt.compare(password, user.pass, function(error, isMatch) {
            if (error) {
                res.status(500).send(`Error al validar usuario> ${error}`)
            } else if (!isMatch) {
                res.status(401).send({ 'mensaje':'incorrecto'})
            } else {
                res.status(200).send({ 'mensaje':'correcto', 'token': servicio.createToken(user) })
            }
          })
    })

 


}

function todos(req, res) {
    Usuario.find({}, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
        if (!usuario) return res.status(404).send({ message: 'Error la persona no existe' })

        res.status(200).send({ usuario })
    })

}


const validarVigenciaUsuario = (req,res) =>{
    Usuario.findById(req.user, function(err, usuario){
        if(err) return res.status(401).send({message:'Usuario no autorizado'})

        return res.status(200).send({'usuario':usuario.mail})
    })
}

module.exports = {
    guardar,
    todos,
    validar,
    validarVigenciaUsuario
};
