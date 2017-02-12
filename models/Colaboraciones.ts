"use strict";
import * as mongoose from "mongoose";

import { Usuario } from "./Usuarios";
import { Proyecto } from "./Proyectos";

export enum PermisosColaboracion {
    SoloLectura,
    Edicion
}

export class Colaboracion {
    schema: mongoose.Schema;
    static current: Colaboracion = new Colaboracion();

    private constructor() {
        this.schema = new mongoose.Schema({
            usuario: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(Usuario.name).schema },
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(Proyecto.name).schema },
            fecha: Date,
            permisos: Number
        });
        this.schema.index({ usuario: 1, proyecto: 1 }, { unique: true });
        mongoose.model(Colaboracion.name, this.schema);
    }
}