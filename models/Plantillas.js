"use strict";
var mongoose = require("mongoose");
var Usuarios_1 = require("./Usuarios");
var Plantilla = (function () {
    function Plantilla() {
        this.schema = new mongoose.Schema({
            htmlPortada: String,
            htmlEscena: String,
            nombre: String,
            autor: { type: mongoose.Schema.Types.ObjectId, ref: Usuarios_1.Usuario.name },
            porDefecto: Boolean,
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