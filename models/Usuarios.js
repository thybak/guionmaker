var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    email: String,
    nombreUsuario: String,
    pass: String
});

mongoose.model('Usuario', UsuarioSchema);