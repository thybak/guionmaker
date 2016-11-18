var mongoose = require('mongoose');

var ClasificacionSchema = new mongoose.Schema({
    nombre: String
});

mongoose.model('Clasificacion', ClasificacionSchema);