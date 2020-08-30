'use strict'

var Prestamo = require('../models/prestamo')

function guardarPrestamo(req, res){

    let prestamo = new Prestamo
    prestamo.id_libro = req.body.id_libro
    prestamo.id_alumno = req.body.id_alumno

    prestamo.save((err, prestamostore) => {

        if (err) return res.status(401).send(`Error base de datos> ${err}`)

        res.status(200).send({ prestamo: prestamostore })

    })
}

function buscarPrestamoPorLibro(req, res) {

    let idlibro = req.query.id_libro

    Prestamo.find({ id_libro: idlibro}, (err, prestamo) => {
        if (!prestamo) return res.status(404).send({ message: 'Error el prestamo de ese libro no existe' })
            res.status(200).send({prestamo})
    })
}

function todosPrestamos(req,res) {

    Prestamo.find({estado : true})
    .populate('id_libro')
    .populate('id_alumno')
    .exec((err,prestamos)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        
        if(!prestamos) return res.status(404).send({message:'Error no existen prestamos'})
            res.status(200).send({prestamos})
    })
}

function buscarPrestamoPorAlumno(req, res) {

    let idalumno = req.query.id_alumno

    Prestamo.find({ id_alumno: idalumno}, (err, prestamo) => {
        if (!prestamo) return res.status(404).send({ message: 'Error el prestamo de ese libro no existe' })
            res.status(200).send({prestamo})
    })
}


module.exports ={
    guardarPrestamo,
    buscarPrestamoPorLibro,
    buscarPrestamoPorAlumno,
    todosPrestamos
}