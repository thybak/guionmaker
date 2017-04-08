"use strict";

import * as mongoose from "mongoose";
import { Genero } from "./Generos";
import { Clasificacion } from "./Clasificaciones";
import { Usuario } from "./Usuarios";

export class Proyecto {
    schema: mongoose.Schema;
    static current: Proyecto = new Proyecto();

    private constructor() {
        this.schema = new mongoose.Schema({
            nombre: String,
            sinopsis: String,
            genero: { type: mongoose.Schema.Types.ObjectId, ref: Genero.name },
            clasificacion: { type: mongoose.Schema.Types.ObjectId, ref: Clasificacion.name },
            autor: { type: mongoose.Schema.Types.ObjectId, ref: Usuario.name },
            publico: Boolean,
            fechaCreacion: { type: Date, default: Date.now() },
            fechaModificacion: { type: Date },
            cancelado: Boolean
        });
        mongoose.model(Proyecto.name, this.schema);
    }
}

