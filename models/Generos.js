"use strict";
const mongoose = require("mongoose");
class Genero {
    constructor() {
        this.schema = new mongoose.Schema({
            nombre: String
        });
        mongoose.model(Genero.name, this.schema);
    }
}
Genero.current = new Genero();
exports.Genero = Genero;
