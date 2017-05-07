"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var DetallesTecnicos_1 = require("./DetallesTecnicos");
var DetallesLiterarios_1 = require("./DetallesLiterarios");
var Proyectos_1 = require("./Proyectos");
var Escena = (function () {
    function Escena() {
        this.schema = new mongoose.Schema({
            titulo: String,
            orden: Number,
            destacado: Boolean,
            noche: Boolean,
            exterior: Boolean,
            fechaCreacion: { type: Date, default: Date.now() },
            detalleTecnico: DetallesTecnicos_1.DetalleTecnico.current.schema,
            detalleLiterario: DetallesLiterarios_1.DetalleLiterario.current.schema,
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyectos_1.Proyecto.name, required: true }
        });
        mongoose.model(Escena.name, this.schema);
    }
    return Escena;
}());
Escena.current = new Escena();
exports.Escena = Escena;
//# sourceMappingURL=Escenas.js.map