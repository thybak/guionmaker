"use strict";

import * as mongoose from "mongoose";
import { Proyecto } from "./Proyectos";

export class Escenario {
    schema: mongoose.Schema;
    static current: Escenario = new Escenario();

    private constructor() {
        this.schema = new mongoose.Schema({
            nombre: String,
            ubicacion: String,
            descripcion: String,
            imagen: String,
            mimeType: String,
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyecto, required: true }
        });

        mongoose.model(Escenario.name, this.schema);
    }

}