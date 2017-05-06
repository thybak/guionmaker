"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Proyectos_1 = require("./Proyectos");
var Personaje = (function () {
    function Personaje() {
        this.schema = new mongoose.Schema({
            nombre: String,
            edad: Number,
            procedencia: String,
            biografia: String,
            descripcionFisica: String,
            descripcionPsicologica: String,
            imagen: String,
            mimeType: String,
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyectos_1.Proyecto.name, required: true }
        });
        mongoose.model(Personaje.name, this.schema);
    }
    return Personaje;
}());
Personaje.current = new Personaje();
exports.Personaje = Personaje;
//# sourceMappingURL=Personajes.js.map