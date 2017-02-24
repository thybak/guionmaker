"use strict";

import * as mongoose from "mongoose";
import { Proyecto } from "./Proyectos";

export class Personaje {
    schema: mongoose.Schema;
    static current: Personaje = new Personaje();

    private constructor() {
        this.schema = new mongoose.Schema({
            nombre: String,
            edad: Number,
            procedencia: String,
            biografia: String,
            descripcionFisica: String,
            descripcionLogica: String,
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyecto, required: true }
        });

        mongoose.model(Personaje.name, this.schema);
    }
}