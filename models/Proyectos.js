"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Generos_1 = require("./Generos");
var Clasificaciones_1 = require("./Clasificaciones");
var Colaboraciones_1 = require("./Colaboraciones");
var Usuarios_1 = require("./Usuarios");
var ProyectoModel = /** @class */ (function () {
    function ProyectoModel() {
    }
    return ProyectoModel;
}());
exports.ProyectoModel = ProyectoModel;
var Proyecto = /** @class */ (function () {
    function Proyecto() {
        this.schema = new mongoose.Schema({
            nombre: String,
            sinopsis: String,
            genero: { type: mongoose.Schema.Types.ObjectId, ref: Generos_1.Genero.name },
            clasificacion: { type: mongoose.Schema.Types.ObjectId, ref: Clasificaciones_1.Clasificacion.name },
            autor: { type: mongoose.Schema.Types.ObjectId, ref: Usuarios_1.Usuario.name, required: true },
            colaboradores: [Colaboraciones_1.Colaboracion.current.schema],
            publico: Boolean,
            fechaCreacion: { type: Date, default: Date.now() },
            fechaModificacion: { type: Date },
            cancelado: Boolean
        });
        mongoose.model(Proyecto.name, this.schema);
    }
    Proyecto.current = new Proyecto();
    return Proyecto;
}());
exports.Proyecto = Proyecto;
//# sourceMappingURL=Proyectos.js.map