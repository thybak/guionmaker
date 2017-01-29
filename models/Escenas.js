"use strict";
const mongoose = require("mongoose");
const DetallesTecnicos_1 = require("./DetallesTecnicos");
const DetallesLiterarios_1 = require("./DetallesLiterarios");
const Proyectos_1 = require("./Proyectos");
class Escena {
    constructor() {
        this.schema = new mongoose.Schema({
            titulo: String,
            orden: Number,
            destacado: Boolean,
            noche: Boolean,
            exterior: Boolean,
            fechaCreacion: { type: Date, default: Date.now() },
            detalleTecnico: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(DetallesTecnicos_1.DetalleTecnico.name).schema },
            detalleLiterario: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(DetallesLiterarios_1.DetalleLiterario.name).schema },
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(Proyectos_1.Proyecto.name).schema }
        });
        this.schema.pre('remove', function (next) {
            console.log(this);
            mongoose.model(DetallesTecnicos_1.DetalleTecnico.name).remove({ _id: this.detalleTecnico }).exec();
            mongoose.model(DetallesLiterarios_1.DetalleLiterario.name).remove({ _id: this.detalleLiterario }).exec();
            next();
        });
        mongoose.model(Escena.name, this.schema);
    }
}
Escena.current = new Escena();
exports.Escena = Escena;
