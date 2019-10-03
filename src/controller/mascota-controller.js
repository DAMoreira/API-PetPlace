var Mascota = require('../models/mascota.model');
var config = require('../config/config');
var jwt = require('jsonwebtoken');

//funcion para valdiar token, si esta activo devulve el emial sino error.
function validarTk(token){
    return jwt.verify(token, config.jwtSecret);
           
}

//metodo de alta de mascota
exports.registerMascota = (req, res) => {
    //if para controlar los datos ingresados, cuando pongo la fecha no me lo toma por eso lo saque :B 
    if (!req.body.nombre || !req.body.raza || !req.body.sexo || !req.body.foto || !req.body.ubicacion) {
        return res.status(400).json({ 'msg': 'Revise los campos resaltados' });
    }

    let newMascota = Mascota(req.body, amo = validarTk(req.body.token).id);
    newMascota.save((err, mascota) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        return res.status(201).json( { mascota: (newMascota), 
                                       msj:"Guau! Nuevo Perfil Creado!",
                                       msj2: validarTk(req.body.token)
                                 
        });
    });
};