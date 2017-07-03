'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = Schema({
    title: String,
    picture: String,
    album: {type: Schema.ObjectId, ref: 'Album'} // Esta es la manera para relacionar la imagen con un album en codigo en metodo populate
});

module.exports = mongoose.model('Image', ImageSchema);
