var mongoose = require('mongoose');

var ProyectoSchema = new mongoose.Schema({
    nombre: String,
    sinopsis: String,
    genero: { type: mongoose.Schema.ObjectId, ref: mongoose.model('Genero').schema },
    clasificacion: { type: mongoose.Schema.ObjectId, ref: mongoose.model('Clasificacion').schema },
    autor: { type: mongoose.Schema.ObjectId, ref: mongoose.model('Usuario').schema },
    publico: Boolean,
    fechaCreacion: { type: Date, default: Date.now() },
    fechaModificacion: { type: Date }
});

mongoose.model('Proyecto', ProyectoSchema);