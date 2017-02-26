"use strict";
const mongoose = require("mongoose");
const Proyectos_1 = require("./Proyectos");
class Escenario {
    constructor() {
        this.schema = new mongoose.Schema({
            nombre: String,
            ubicacion: String,
            descripcion: String,
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyectos_1.Proyecto, required: true }
        });
        mongoose.model(Escenario.name, this.schema);
    }
}
Escenario.current = new Escenario();
exports.Escenario = Escenario;