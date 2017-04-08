"use strict";

import * as mongoose from "mongoose";
import { Usuario } from "./Usuarios";

export enum TipoPlantilla {
    Portada = 0,
    Escena = 1
}

export class Plantilla {
    schema: mongoose.Schema;
    static current: Plantilla = new Plantilla();

    constructor() {
        this.schema = new mongoose.Schema({
            html: String,
            tipo: Number,
            autor: { type: mongoose.Schema.Types.ObjectId, ref: Usuario.name },
            fechaCreacion: { type: Date, default: Date.now },
            fechaModificacion: Date
        });
        mongoose.model(Plantilla.name, this.schema);
    }
}