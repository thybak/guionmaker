"use strict";
const mongoose = require("mongoose");
const Usuarios_1 = require("./Usuarios");
var TipoPlantilla;
(function (TipoPlantilla) {
    TipoPlantilla[TipoPlantilla["Portada"] = 0] = "Portada";
    TipoPlantilla[TipoPlantilla["Escena"] = 1] = "Escena";
})(TipoPlantilla = exports.TipoPlantilla || (exports.TipoPlantilla = {}));
class Plantilla {
    constructor() {
        this.schema = new mongoose.Schema({
            html: String,
            tipo: Number,
            autor: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(Usuarios_1.Usuario.name).schema },
            fechaCreacion: { type: Date, default: Date.now },
            fechaModificacion: Date
        });
        mongoose.model(Plantilla.name, this.schema);
    }
}
Plantilla.current = new Plantilla();
exports.Plantilla = Plantilla;
