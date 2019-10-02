var Mascota = require('../models/mascota.model');
var config = require('../config/config');


exports.registerMascota = (req, res) => {
    if (!req.body.nombre || !req.body.raza || !req.body.sexo || !req.body.foto || !req.body.ubicacion) {
        return res.status(400).json({ 'msg': 'Revise los campos resaltados' });
    }

    let newMascota = Mascota(req.body);
    newMascota.save((err, mascota) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        return res.status(201).json( { mascota: (newMascota), 
        });
    });
};