"use strict";
var mongoose = require("mongoose");
var Usuarios_1 = require("./Usuarios");
var Proyectos_1 = require("./Proyectos");
var PermisosColaboracion;
(function (PermisosColaboracion) {
    PermisosColaboracion[PermisosColaboracion["SoloLectura"] = 0] = "SoloLectura";
    PermisosColaboracion[PermisosColaboracion["Edicion"] = 1] = "Edicion";
})(PermisosColaboracion = exports.PermisosColaboracion || (exports.PermisosColaboracion = {}));
var Colaboracion = (function () {
    function Colaboracion() {
        this.schema = new mongoose.Schema({
            usuario: { type: mongoose.Schema.Types.ObjectId, ref: Usuarios_1.Usuario.name },
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyectos_1.Proyecto.name },
            fecha: Date,
            permisos: Number
        });
        this.schema.index({ usuario: 1, proyecto: 1 }, { unique: true });
        mongoose.model(Colaboracion.name, this.schema);
    }
    return Colaboracion;
}());
Colaboracion.current = new Colaboracion();
exports.Colaboracion = Colaboracion;
//# sourceMappingURL=Colaboraciones.js.map