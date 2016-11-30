"use strict";
import * as mongoose from "mongoose";
import { DetalleTecnico } from "./DetallesTecnicos";
import { DetalleLiterario } from "./DetallesLiterarios";
import { Proyecto } from "./Proyectos";

export class Escena {
    schema: mongoose.Schema;
    static current: Escena = new Escena();

    private constructor() {
        this.schema = new mongoose.Schema({
            titulo: String,
            orden: Number,
            destacado: Boolean,
            detalleTecnico: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(DetalleTecnico.name).schema },
            detalleLiterario: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(DetalleLiterario.name).schema },
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(Proyecto.name).schema }
        });
        mongoose.model(Escena.name, this.schema);
    }
}