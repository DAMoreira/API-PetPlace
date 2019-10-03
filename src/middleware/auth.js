//este archivo en teoria me debería permitir controlar los tokens 

'use strict'
const jwt = require('jwt')
const moment = require('moment')
const config = require('./config/config')

function isAuth(req, res, next) {
    if(!req.headers.authorization){
        res.status(403).send({message : 'No tenes autorización'})
    }
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.decode(token, config.jwtSecret)
    next()
}
module.exports = isAuth