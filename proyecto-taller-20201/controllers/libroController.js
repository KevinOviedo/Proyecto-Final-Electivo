'use strict'

var Libro = require('../models/libro')

function guardarLibro(req,res){

    let libro = new Libro();

    libro.titulo = req.body.titulo;
    libro.id_libro = req.body.id_libro;
    libro.autor = req.body.autor;
    libro.idioma = req.body.idioma;


    libro.save((err, librostore) => {

        if (err) return res.status(401).send(`Error base de datos> ${err}`)

        res.status(200).send({ libro: librostore })

    })
}
function buscarLibro(req, res) {

    let titulolibro = req.query.titulo

    Libro.find({ titulo: titulolibro}).count().exec((err,contador)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})

        if(!contador) return res.status(404).send({message:'Error el libro no existe'})
        res.status(200).send({contador})
    })
}

function todosLibro(req,res) {

    Libro.find({},(err,libro)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})

        if(!libro) return res.status(404).send({message:'Error el libro no existe'})
            res.status(200).send({libro})
     })
}

// EDITAR O MODIFICAR
function modificarLibro(req, res){
    let idlibro = req.params.id
    let nuevolibro = req.body
    Libro.findByIdAndUpdate(idlibro, nuevolibro, (err, libroModificado)=>{
        if(err) return res.status(500).send({message: 'Error al realizar la peticion'})
        res.status(200).send({ libro: libroModificado})
    })
}

//ELIMINAR LIBRO
function eliminarLibro(req, res){
     let idlibro = req.params.id
     Libro.findById(idlibro, (err, libroeliminado)=>{
         if(err) return res.status(500).send({message: 'Error al realizar la peticion'})
        
         libroeliminado.remove(err =>{
            if(err) return res.status(500).send({message: 'Error al realizar la peticion'})

            if(!libroeliminado) return res.status(404).send({message: 'El libro no existe'})
            res.status(200).send({message:'Libro Eliminado'})
         })
     })
}


// exportamos las funciones 
module.exports = {
    guardarLibro,
    todosLibro,
    buscarLibro,
    modificarLibro,
    eliminarLibro
};