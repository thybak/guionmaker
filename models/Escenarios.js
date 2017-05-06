"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Proyectos_1 = require("./Proyectos");
var Escenario = (function () {
    function Escenario() {
        this.schema = new mongoose.Schema({
            nombre: String,
            ubicacion: String,
            descripcion: String,
            imagen: String,
            mimeType: String,
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyectos_1.Proyecto.name, required: true }
        });
        mongoose.model(Escenario.name, this.schema);
    }
    return Escenario;
}());
Escenario.current = new Escenario();
exports.Escenario = Escenario;
//# sourceMappingURL=Escenarios.js.map