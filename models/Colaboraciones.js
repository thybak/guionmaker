"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Usuarios_1 = require("./Usuarios");
var PermisosColaboracion;
(function (PermisosColaboracion) {
    PermisosColaboracion[PermisosColaboracion["SoloLectura"] = 0] = "SoloLectura";
    PermisosColaboracion[PermisosColaboracion["Edicion"] = 1] = "Edicion";
})(PermisosColaboracion = exports.PermisosColaboracion || (exports.PermisosColaboracion = {}));
var Colaboracion = /** @class */ (function () {
    function Colaboracion() {
        this.schema = new mongoose.Schema({
            usuario: { type: mongoose.Schema.Types.ObjectId, ref: Usuarios_1.Usuario.name, required: false, sparse: true },
            fecha: Date,
            permisos: Number
        });
    }
    Colaboracion.current = new Colaboracion();
    return Colaboracion;
}());
exports.Colaboracion = Colaboracion;
//# sourceMappingURL=Colaboraciones.js.map