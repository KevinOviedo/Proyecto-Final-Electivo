'use sctrict'

const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PrestamoSchema = Schema(
    {
        id_libro:{
            type: Schema.ObjectId, ref: "libros"
        },
        id_alumno:{
            type: Schema.ObjectId, ref: "alumnos"
        },
        fecha_inicio: { 
            type:Date, 
            default: moment().format('YYYY/MM/DD')
        },
        devolucion:{
            type:Date,
            default: moment().add(15,'days').format('YYYY/MM/DD')
        },
        estado:{
            type:Boolean,
            default: true
        }
    }
);
    


module.exports = mongoose.model('prestamos', PrestamoSchema)