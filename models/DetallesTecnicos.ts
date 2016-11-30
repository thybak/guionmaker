﻿"use strict";
import * as mongoose from "mongoose";

export class DetalleTecnico {
    schema: mongoose.Schema;
    static current: DetalleTecnico = new DetalleTecnico();

    private constructor() {
        this.schema = new mongoose.Schema({
            imagen: String,
            texto: String
        });
        mongoose.model(DetalleTecnico.name, this.schema);
    }
}