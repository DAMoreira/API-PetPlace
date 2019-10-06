var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var MascotaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    raza: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    nroPariciones: {
        type: String,
        required: false
    },
    fNacimiento: {
        type: Date,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    ubicacion:
    {
        type: String,
        required: true     
    },
    descripcion:
    {
        type: String,
        required: false
    },
    pedigree:
    {
        type: Boolean,
        required: false
    },
    amo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});



module.exports = mongoose.model('Mascota', MascotaSchema);