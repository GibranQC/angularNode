'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// carga de rutas
var album_routes = require('./routes/album');
var image_routes = require('./routes/image');
var user_routes = require('./routes/user')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 

// rutas base
app.use('/api',album_routes)
app.use('/api',image_routes)
app.use('/api',user_routes)

module.exports = app;