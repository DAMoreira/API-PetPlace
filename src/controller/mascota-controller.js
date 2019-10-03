var Mascota = require('../models/mascota.model');
var config = require('../config/config');
var userc = require('../controller/user-controller')

//metodo de alta de mascota
exports.registerMascota = (req, res) => {
    //if para controlar los datos ingresados, cuando pongo la fecha no me lo toma por eso lo saque :B 
    if (!req.body.nombre || !req.body.raza || !req.body.sexo || !req.body.foto || !req.body.ubicacion) {
        return res.status(400).json({ 'msg': 'Revise los campos resaltados' });
    }

    let newMascota = Mascota(req.body);
    newMascota.save((err, mascota) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        return res.status(201).json( { mascota: (newMascota), 
                                       msj:"Guau! Nuevo Perfil Creado!",
                                 
        });
    });
};