"use strict";
import * as mongoose from "mongoose";

export class DetalleLiterario {
    schema: mongoose.Schema;
    static current: DetalleLiterario = new DetalleLiterario();

    private constructor() {
        this.schema = new mongoose.Schema({
            texto: { type: String, default: new String('') }
        });
    }
}