"use strict";
var mongoose = require("mongoose");
var Usuarios_1 = require("./Usuarios");
var TipoPlantilla;
(function (TipoPlantilla) {
    TipoPlantilla[TipoPlantilla["Portada"] = 0] = "Portada";
    TipoPlantilla[TipoPlantilla["Escena"] = 1] = "Escena";
})(TipoPlantilla = exports.TipoPlantilla || (exports.TipoPlantilla = {}));
var Plantilla = (function () {
    function Plantilla() {
        this.schema = new mongoose.Schema({
            html: String,
            tipo: Number,
            autor: { type: mongoose.Schema.Types.ObjectId, ref: Usuarios_1.Usuario.name },
            fechaCreacion: { type: Date, default: Date.now },
            fechaModificacion: Date
        });
        mongoose.model(Plantilla.name, this.schema);
    }
    return Plantilla;
}());
Plantilla.current = new Plantilla();
exports.Plantilla = Plantilla;
//# sourceMappingURL=Plantillas.js.map