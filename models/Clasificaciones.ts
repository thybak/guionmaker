"use strict";
import * as mongoose from "mongoose";

export class Clasificacion {
    schema: mongoose.Schema;
    static current: Clasificacion = new Clasificacion();

    private constructor() {
        this.schema = new mongoose.Schema({
            nombre: String
        });
        mongoose.model(Clasificacion.name, this.schema);
    }
}