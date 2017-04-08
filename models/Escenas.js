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
            detalleTecnico: { type: mongoose.Schema.Types.ObjectId, ref: DetallesTecnicos_1.DetalleTecnico.name },
            detalleLiterario: { type: mongoose.Schema.Types.ObjectId, ref: DetallesLiterarios_1.DetalleLiterario.name },
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyectos_1.Proyecto.name }
        });
        this.schema.pre('remove', function (next) {
            mongoose.model(DetallesTecnicos_1.DetalleTecnico.name).remove({ _id: this.detalleTecnico }).exec();
            mongoose.model(DetallesLiterarios_1.DetalleLiterario.name).remove({ _id: this.detalleLiterario }).exec();
            next();
        });
        mongoose.model(Escena.name, this.schema);
    }
}
Escena.current = new Escena();
exports.Escena = Escena;
