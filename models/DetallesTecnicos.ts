"use strict";
import * as mongoose from "mongoose";

export class DetalleTecnico {
    schema: mongoose.Schema;
    static current: DetalleTecnico = new DetalleTecnico();

    private constructor() {
        this.schema = new mongoose.Schema({
            imagen: String,
            mimeType: String,
            texto: { type: String, default: new String('') }
        });
    }
}