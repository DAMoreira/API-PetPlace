var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var RazasSchema = new mongoose.Schema({
    raza: {
        type: String,
        required: false
    }
});



module.exports = mongoose.model('Razas', RazasSchema);