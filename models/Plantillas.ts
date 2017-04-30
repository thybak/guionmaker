"use strict";

import * as mongoose from "mongoose";
import { Usuario } from "./Usuarios";

export class Plantilla {
    schema: mongoose.Schema;
    static current: Plantilla = new Plantilla();

    constructor() {
        this.schema = new mongoose.Schema({
            htmlPortada: String,
            htmlEscena: String,
            nombre: String,
            autor: { type: mongoose.Schema.Types.ObjectId, ref: Usuario.name },
            porDefecto: Boolean,
            fechaCreacion: { type: Date, default: Date.now },
            fechaModificacion: Date
        });
        mongoose.model(Plantilla.name, this.schema);
    }
}