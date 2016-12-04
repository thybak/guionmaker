"use strict";
const mongoose = require("mongoose");
const DetallesTecnicos_1 = require("./DetallesTecnicos");
const DetallesLiterarios_1 = require("./DetallesLiterarios");
const Proyectos_1 = require("./Proyectos");
class EscenaModel {
}
exports.EscenaModel = EscenaModel;
class Escena {
    constructor() {
        this.schema = new mongoose.Schema({
            titulo: String,
            orden: Number,
            destacado: Boolean,
            detalleTecnico: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(DetallesTecnicos_1.DetalleTecnico.name).schema },
            detalleLiterario: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(DetallesLiterarios_1.DetalleLiterario.name).schema },
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(Proyectos_1.Proyecto.name).schema }
        });
        mongoose.model(Escena.name, this.schema);
    }
}
Escena.current = new Escena();
exports.Escena = Escena;
