var mongoose = require('mongoose');

var DetalleTecnicoSchema = new mongoose.Schema({
    imagen: String,
    texto: String
});

mongoose.model('DetalleTecnico', DetalleTecnicoSchema);