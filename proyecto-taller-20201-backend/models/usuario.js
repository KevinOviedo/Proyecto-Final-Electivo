'use strict'
const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UsuarioSchema = Schema(
    {
      nombre:{
        type: String
      },
      mail:{
        type: String,
        required:true 
      },
      pass:{
        type:String,
        required:true
      }
    })

    UsuarioSchema.pre('save',function(next){
      const usuario = this;
      if(!usuario.isModified('pass')){
        return next();
      }

  

    bcrypt.genSalt(10,(err,salt)=> {
      if(err){
        next(err);
      }
      bcrypt.hash(usuario.pass,salt,null,(err,hash)=>{
        if(err){
          next(err);
        }
        usuario.pass = hash;
        next();

      })
    })
  })

  module.exports = mongoose.model('usuarios', UsuarioSchema)
