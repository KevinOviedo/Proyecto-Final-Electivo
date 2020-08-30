'use sctrict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AlumnoSchema = Schema(
    {
        nombre:String,
        apellido:String,
        rut:{
            type:String,
            unique: true,
            required: true
        }
    });
    

module.exports = mongoose.model('alumnos', AlumnoSchema)