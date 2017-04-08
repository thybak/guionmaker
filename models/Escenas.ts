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
            detalleTecnico: { type: mongoose.Schema.Types.ObjectId, ref: DetalleTecnico.name },
            detalleLiterario: { type: mongoose.Schema.Types.ObjectId, ref: DetalleLiterario.name },
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyecto.name }
        });
        this.schema.pre('remove', function (next) {
            mongoose.model(DetalleTecnico.name).remove({ _id: this.detalleTecnico }).exec();
            mongoose.model(DetalleLiterario.name).remove({ _id: this.detalleLiterario }).exec();
            next();
        });
        mongoose.model(Escena.name, this.schema);
    }
}