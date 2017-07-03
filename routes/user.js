'use strict'

var express = require('express')
var UserController = require('../controllers/user');

var api = express.Router();

api.post('/user',UserController.nuevoUsuario);
api.post('/login',UserController.login);
api.get('/users',UserController.usuarios);

module.exports = api;

