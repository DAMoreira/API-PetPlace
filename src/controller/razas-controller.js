var Raza = require('../models/razas.model');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var each = require('async/each')

//metodo de alta de razas a traves de un json
exports.registerRaza = (req, res) => {
    for (i in req.body) {
        console.log(req.body[i])
        let newRaza = Raza(req.body[i]);
        console.log(newRaza)
        newRaza.save((err, raza) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return true
        })
    }
    res.status(201).json({msg: "Las siguientes razas se han dado de alta", 
    razas: req.body})
}

exports.getAllRazas = (req, res) =>{
    Raza.find({}, (err, raza)=>{
        if(err){
            return res.status(400).send({ 'msg': err });
        }
        return res.status(200).json({
           raza
        });   
}
    )};