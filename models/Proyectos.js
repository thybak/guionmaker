"use strict";
const mongoose = require("mongoose");
const genero = require("./Generos");
const clasificacion = require("./Clasificaciones");
const usuario = require("./Usuarios");
class Proyecto {
    constructor() {
        this.schema = new mongoose.Schema({
            nombre: String,
            sinopsis: String,
            genero: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(genero.Genero.name).schema },
            clasificacion: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(clasificacion.Clasificacion.name).schema },
            autor: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(usuario.Usuario.name).schema },
            publico: Boolean,
            fechaCreacion: { type: Date, default: Date.now() },
            fechaModificacion: { type: Date }
        });
        mongoose.model(Proyecto.name, this.schema);
    }
}
Proyecto.current = new Proyecto();
exports.Proyecto = Proyecto;
