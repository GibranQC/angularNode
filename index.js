'use strict'

var mongoose = require('mongoose');
var port = process.env.PORT || 3300;
var app = require('./app')

mongoose.connect('mongodb://localhost:27017/albums',(err,res) =>{
	if(err){
		throw err;
	}else{
		console.log('Base de datos funcionando correctamente')
		app.listen(port,()=>{
			console.log('Servidor iniciado en el puerto ||'+ port)
		});
	}
})

