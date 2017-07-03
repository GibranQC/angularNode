'use strict'

var express = require('express')
var ImageController = require('../controllers/image');

var api = express.Router();

api.get('/prueba',ImageController.pruebas);
api.get('/image/:id',ImageController.getImagen);
api.get('/images/:album?',ImageController.getImages);
api.post('/image',ImageController.saveImage);
api.put('/image/:id',ImageController.updateImage);
api.delete('/image/:id',ImageController.deleteImage);

module.exports = api;