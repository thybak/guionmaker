"use strict";

import * as mongoose from "mongoose";
import { Genero } from "./Generos";
import { Clasificacion } from "./Clasificaciones";
import { Colaboracion } from "./Colaboraciones";
import { Usuario } from "./Usuarios";

export class ProyectoModel {
    nombre: string;
    sinopsis: string;
    genero: string;
    clasificacion: string;
    autor: string;
    colaboradores: any[];
    publico: boolean;
    fechaCreacion: Date;
    fechaModificacion: Date;
    cancelado: boolean;
}

export class Proyecto {
    schema: mongoose.Schema;
    static current: Proyecto = new Proyecto();

    private constructor() {
        this.schema = new mongoose.Schema({
            nombre: String,
            sinopsis: String,
            genero: { type: mongoose.Schema.Types.ObjectId, ref: Genero.name },
            clasificacion: { type: mongoose.Schema.Types.ObjectId, ref: Clasificacion.name },
            autor: { type: mongoose.Schema.Types.ObjectId, ref: Usuario.name, required: true },
            colaboradores: [Colaboracion.current.schema],
            publico: Boolean,
            fechaCreacion: { type: Date, default: Date.now() },
            fechaModificacion: { type: Date },
            cancelado: Boolean
        });
        mongoose.model(Proyecto.name, this.schema);
    }
}

