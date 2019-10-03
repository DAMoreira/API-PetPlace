var User        = require('../models/user');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt  = require('passport-jwt').ExtractJwt;
var config      = require('../config/config');
 
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

module.exports = new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload.id, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});
exports.ensureAuthenticated = function(req, res, next) {
    if(!req.headers.authorization) {
      return res
        .status(403)
        .send({message: "Tu petición no tiene cabecera de autorización"});
    }
    
    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, config.jwtSecret);
    
    if(false) {
       return res
           .status(401)
          .send({message: "El token ha expirado"});
    }
    
    req.user = payload.sub;
    next();
  }