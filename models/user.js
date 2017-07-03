'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	nombreCompleto: String,
	correoElectronico: String,
	contrasenia: String,
	nombreUsuario: String
})

module.exports = mongoose.model('User',UserSchema);