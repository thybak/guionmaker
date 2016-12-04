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
            genero: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(Generos_1.Genero.name).schema },
            clasificacion: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(Clasificaciones_1.Clasificacion.name).schema },
            autor: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(Usuarios_1.Usuario.name).schema },
            publico: Boolean,
            fechaCreacion: { type: Date, default: Date.now() },
            fechaModificacion: { type: Date }
        });
        mongoose.model(Proyecto.name, this.schema);
    }
}
Proyecto.current = new Proyecto();
exports.Proyecto = Proyecto;
