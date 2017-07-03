'use strict'

var User = require('../models/user');

function nuevoUsuario(req, res) {
	console.log('entre')
    var user = new User();
    var params = req.body;

    user.nombreCompleto = params.nombreCompleto;
    user.correoElectronico = params.correoElectronico;
    user.contrasenia = params.contrasenia;
    user.nombreUsuario = params.nombreUsuario;

    user.save((err, userStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' })
        } else {
            if (!userStored) {
                res.status(404).send({ message: 'No se pudo crear el usuario' })
            } else {
                res.status(200).send({ user: userStored })
            }
        }
    })
}

function usuarios (req, res){
	User.find({}, (err, users) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!users) {
                res.status(404).send({ message: 'No existe alumnos!!' });
            } else {
                res.status(200).send({ users })
            }
        }
    })
}

function login(req, res) {
	var params = req.body;
    var correoElectronico = params.correoElectronico;
    var contrasenia = params.contrasenia;

    User.findOne({ correoElectronico: correoElectronico, contrasenia: contrasenia }, (err, login) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' })
        } else {
            if (!login) {
                res.status(404).send({ message: 'Usuario no registrado' })
            } else {
                res.status(200).send({ login })
            }
        }
    })

}

module.exports = {
    nuevoUsuario,
    login,
    usuarios
}
