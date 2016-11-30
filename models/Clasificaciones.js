"use strict";
const mongoose = require("mongoose");
class Clasificacion {
    constructor() {
        this.schema = new mongoose.Schema({
            nombre: String
        });
        mongoose.model(Clasificacion.name, this.schema);
    }
}
Clasificacion.current = new Clasificacion();
exports.Clasificacion = Clasificacion;
