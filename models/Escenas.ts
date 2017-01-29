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
            detalleTecnico: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(DetalleTecnico.name).schema },
            detalleLiterario: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(DetalleLiterario.name).schema },
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: mongoose.model(Proyecto.name).schema }
        });
        this.schema.pre('remove', function (next) {
            console.log(this);
            mongoose.model(DetalleTecnico.name).remove({ _id: this.detalleTecnico }).exec();
            mongoose.model(DetalleLiterario.name).remove({ _id: this.detalleLiterario }).exec();
            next();
        });
        mongoose.model(Escena.name, this.schema);
    }
}