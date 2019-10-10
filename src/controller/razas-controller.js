var Raza = require('../models/razas.model');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var each = require('async/each')

//funcion para valdiar token, si esta activo devulve el emial y id del objeto usuario, sino error.

//metodo de alta de mascota
exports.registerRaza = (req, res) => {
        for (i in req.body){

        
        console.log(req.body[i])
        let newRaza = Raza(req.body[i]);
        console.log(newRaza)
        newRaza.save((err, raza) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            
                return true
            
        //     return res.status(201).json( { raza: (newRaza), 
        //                                    msj:"Guau! Nuevo Perfil Creado!",
            
        //     });
        })
    }
    
    

    
    
;
};
//metodo para mostrar las mascotas, recibe un token y devuelve las mascotas que coinciten el amo con el objectId del token (que sería la referencia del objeto usuario)
