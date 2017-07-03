'use strict'

var Image = require('../models/image')
var Album = require('../models/album');

function pruebas(req, res) {
    res.status(200).send({ message: ' prueba' })
}

function getImagen(req, res) {
    var imageId = req.params.id;

    Image.findById(imageId, (err, imagen) => {
        if (err) {
            res.status(500).send({ message: 'Error al buscar' })
        } else {
            if (!imagen) {
                res.status(404).send({ message: 'No se encontro la imagen' })
            } else {
                Album.populate(imagen, { path: 'album' }, (err, imagen) => {
                    if (err) {
                        res.status(500).send({ message: 'Error en la petición' })
                    } else {
                        res.status(200).send({ imagen })
                    }
                })

            }
        }
    })
}

function saveImage(req, res) {
    var image = new Image();

    var params = req.body;
    image.title = params.title;
    image.picture = null;
    image.album = params.album;

    image.save((err, imageStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' })
        } else {
            if (!imageStored) {
                res.status(404).send({ message: 'No se guardo la imagen' })
            } else {
                res.status(200).send({ image: imageStored })
            }
        }
    })
}

function getImages(req, res) {
    var albumId = req.params.album;

    if (!albumId) {
        var find = Image.find({}).sort('-title');
    } else {
        var find = Image.find({ album: albumId }).sort('-title');
    }

    find.exec((err, images) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!images) {
                res.status(404).send({ message: 'No existe el imagenes en este album' });
            } else {
                Album.populate(images, { path: 'album' }, (err, images) => {
                    if (err) {
                        res.status(500).send({ message: 'Error en la petición' })
                    } else {
                        res.status(200).send({ images })
                    }
                })
            }
        }
    });

}

function updateImage(req, res){
	var imageId = req.params.id;
    var update = req.body;

    Image.findByIdAndUpdate(imageId, update, (err,imageUpdate) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!imageUpdate){
                res.status(404).send({message:'No se ha podido actualizar la imagen'});
            }else{
                res.status(200).send({image:imageUpdate});
            }
        }
    })
}

function deleteImage(req, res) {
    var imageId = req.params.id;
    Image.findByIdAndRemove(imageId, (err, imageRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!imageRemove) {
                res.status(404).send({ message: 'No se ha podido eliminar la imagen' });
            } else {
                res.status(200).send({ image: imageRemove });
            }
        }
    })
}

module.exports = {
    pruebas,
    getImagen,
    saveImage,
    getImages,
    updateImage,
    deleteImage
}
