var mongoose = require('mongoose');

var ProyectoSchema = new mongoose.Schema({
    nombre: String,
    sinopsis: String,
    fechaCreacion: { type: Date, default: Date.now },
    fechaModificacion: { type: Date }
});

mongoose.model('Proyecto', ProyectoSchema);