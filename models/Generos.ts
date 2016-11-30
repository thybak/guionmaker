"use strict";
import * as mongoose from "mongoose";

export class Genero {
    schema: mongoose.Schema;
    static current: Genero = new Genero();

    private constructor() {
        this.schema = new mongoose.Schema({
            nombre: String
        });
        mongoose.model(Genero.name, this.schema);
    }
}