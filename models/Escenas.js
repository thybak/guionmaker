"use strict";
const mongoose = require("mongoose");
const detalleTecnico = require("./DetallesTecnicos");
const detalleLiterario = require("./DetallesLiterarios");
const proyecto = require("./Proyectos");
class Escena {
    constructor() {
        this.schema = new mongoose.Schema({
            titulo: String,
            orden: Number,
            destacado: Boolean,
            detalleTecnico: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(detalleTecnico.DetalleTecnico.name).schema },
            detalleLiterario: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(detalleLiterario.DetalleLiterario.name).schema },
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(proyecto.Proyecto.name).schema }
        });
        mongoose.model(Escena.name, this.schema);
    }
}
Escena.current = new Escena();
exports.Escena = Escena;
