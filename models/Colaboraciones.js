"use strict";
const mongoose = require("mongoose");
const Usuarios_1 = require("./Usuarios");
const Proyectos_1 = require("./Proyectos");
var PermisosColaboracion;
(function (PermisosColaboracion) {
    PermisosColaboracion[PermisosColaboracion["SoloLectura"] = 0] = "SoloLectura";
    PermisosColaboracion[PermisosColaboracion["Edicion"] = 1] = "Edicion";
})(PermisosColaboracion = exports.PermisosColaboracion || (exports.PermisosColaboracion = {}));
class Colaboracion {
    constructor() {
        this.schema = new mongoose.Schema({
            usuario: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(Usuarios_1.Usuario.name).schema },
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(Proyectos_1.Proyecto.name).schema },
            fecha: Date,
            permisos: Number
        });
        mongoose.model(Colaboracion.name, this.schema);
    }
}
Colaboracion.current = new Colaboracion();
exports.Colaboracion = Colaboracion;
