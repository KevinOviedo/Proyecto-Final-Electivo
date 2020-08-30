'use sctrict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const LibroSchema = Schema(
    {
        titulo:String,
        id_libro:{
            type:String,
            unique: true,
            required: true
        },
        autor:String,
        idioma: {
            type:String,
            enum:['ingles', 'espanol'],
            default:'espanol'
        }
    });

module.exports = mongoose.model('libros', LibroSchema)