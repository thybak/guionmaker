var mongoose = require('mongoose');

var EscenaSchema = new mongoose.Schema({
    titulo: String,
    orden: Number,
    destacado: Boolean,
    detalleTecnico: { type: mongoose.Schema.ObjectId, ref: mongoose.model('DetalleTecnico').schema },
    detalleLiterario: { type: mongoose.Schema.ObjectId, ref: mongoose.model('DetalleLiterario').schema },
    proyecto: { type: mongoose.Schema.ObjectId, ref: mongoose.model('Proyecto').schema }
});

mongoose.model('Escena', EscenaSchema);