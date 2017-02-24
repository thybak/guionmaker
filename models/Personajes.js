"use strict";
const mongoose = require("mongoose");
const Proyectos_1 = require("./Proyectos");
class Personaje {
    constructor() {
        this.schema = new mongoose.Schema({
            nombre: String,
            edad: Number,
            procedencia: String,
            biografia: String,
            descripcionFisica: String,
            descripcionLogica: String,
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyectos_1.Proyecto, required: true }
        });
        mongoose.model(Personaje.name, this.schema);
    }
}
Personaje.current = new Personaje();
exports.Personaje = Personaje;
