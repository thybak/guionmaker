"use strict";
const mongoose = require("mongoose");
class Usuario {
    constructor() {
        this.schema = new mongoose.Schema({
            nombre: { type: String, required: true },
            apellidos: { type: String, required: true },
            email: { type: String, required: true },
            nombreUsuario: { type: String, required: true },
            pass: { type: String, required: true },
        });
        this.schema.index({ nombreUsuario: 1 }, { unique: true });
        this.schema.index({ email: 1 }, { unique: true });
        mongoose.model(Usuario.name, this.schema);
    }
}
Usuario.current = new Usuario();
exports.Usuario = Usuario;
