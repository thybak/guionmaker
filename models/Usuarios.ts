"use strict";
import * as mongoose from "mongoose";

export class Usuario {
    schema: mongoose.Schema;
    static current: Usuario = new Usuario();

    private constructor() {
        this.schema = new mongoose.Schema({
            nombre: { type: String, required: true },
            apellidos: { type: String, required: true },
            email: { type: String, required: true },
            nombreUsuario: { type: String, required: true },
            pass: { type: String, required: true },
            tokenRecuperacion: String,
            fechaTokenRecuperacion: Date
        }, {collection: 'usuarios'});
        this.schema.index({ nombreUsuario: 1 }, { unique: true });
        this.schema.index({ email: 1 }, { unique: true });
        mongoose.model(Usuario.name, this.schema);
    }
}