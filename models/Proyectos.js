"use strict";
const mongoose = require("mongoose");
const Generos_1 = require("./Generos");
const Clasificaciones_1 = require("./Clasificaciones");
const Usuarios_1 = require("./Usuarios");
class Proyecto {
    constructor() {
        this.schema = new mongoose.Schema({
            nombre: String,
            sinopsis: String,
            genero: { type: mongoose.Schema.Types.ObjectId, ref: Generos_1.Genero.name },
            clasificacion: { type: mongoose.Schema.Types.ObjectId, ref: Clasificaciones_1.Clasificacion.name },
            autor: { type: mongoose.Schema.Types.ObjectId, ref: Usuarios_1.Usuario.name },
            publico: Boolean,
            fechaCreacion: { type: Date, default: Date.now() },
            fechaModificacion: { type: Date },
            cancelado: Boolean
        });
        mongoose.model(Proyecto.name, this.schema);
    }
}
Proyecto.current = new Proyecto();
exports.Proyecto = Proyecto;
