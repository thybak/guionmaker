var mongoose = require('mongoose');

var ProyectoSchema = new mongoose.Schema({
    nombre: String,
    sinopsis: String,
    fechaModificacion: { type: Date, default: Date.now }
});

mongoose.model('Proyecto', ProyectoSchema);