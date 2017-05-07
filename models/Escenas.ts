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
            noche: Boolean,
            exterior: Boolean,
            fechaCreacion: { type: Date, default: Date.now() },
            detalleTecnico: DetalleTecnico.current.schema,
            detalleLiterario: DetalleLiterario.current.schema,
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyecto.name, required: true }
        });
        mongoose.model(Escena.name, this.schema);
    }
}