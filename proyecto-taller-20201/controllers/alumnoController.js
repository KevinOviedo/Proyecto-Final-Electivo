'use strict'

var Alumno = require ('../models/alumno');
const { validate, clean, format } = require('rut.js');

function guardarAlumno(req, res){

    let alumno = new Alumno()
    alumno.nombre = req.body.nombre
    alumno.apellido = req.body.apellido
    alumno.rut = req.body.rut

    alumno.rut = clean(alumno.rut)
    alumno.rut = format(alumno.rut)
    
    
    if(validate(alumno.rut) === true){
        
        alumno.save((err, alumnostore) =>{
            if (err)  return res.status(500).send(`Error base de datos> ${err}`)

            res.status(200).send({ "mensaje": "creado correctamente", alumno: alumnostore })
        })
    }else{
        return res.status(500).send('Error base de datos')
    }

}

function todosalumnos(req,res) {

    Alumno.find({},(err,alumno)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})

        if(!alumno) return res.status(404).send({message:'Error el alumno no existe'})
            res.status(200).send({alumno})
     })
}

function eliminarAlumno(req, res){
    let idalumno = req.params.id
    Alumno.findById(idalumno, (err, alumnoeliminado)=>{
        if(err) return res.status(500).send({message: 'Error al realizar la peticion'})
       
        alumnoeliminado.remove(err =>{
           if(err) return res.status(500).send({message: 'Error al realizar la peticion'})

           if(!alumnoeliminado) return res.status(404).send({message: 'El Alumno no existe'})
           res.status(200).send({message:'Alumno Eliminado'})
        })
    })
}


module.exports = {
    guardarAlumno,
    todosalumnos,
    eliminarAlumno
}