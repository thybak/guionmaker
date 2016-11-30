"use strict";
const mongoose = require("mongoose");
class Usuario {
    constructor() {
        this.schema = new mongoose.Schema({
            nombre: String,
            apellidos: String,
            email: String,
            nombreUsuario: String,
            pass: String
        });
        mongoose.model(Usuario.name, this.schema);
    }
}
Usuario.current = new Usuario();
exports.Usuario = Usuario;
