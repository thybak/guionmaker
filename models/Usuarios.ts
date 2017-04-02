"use strict";
import * as mongoose from "mongoose";

export class Usuario {
    schema: mongoose.Schema;
    static current: Usuario = new Usuario();

    private constructor() {
        this.schema = new mongoose.Schema({
            nombre: String,
            apellidos: String,
            email: String,
            nombreUsuario: String,
            pass: String
        });
        this.schema.index({ nombreUsuario: 1 }, { unique: true });
        this.schema.index({ email: 1 }, { unique: true });
        mongoose.model(Usuario.name, this.schema);
    }
}