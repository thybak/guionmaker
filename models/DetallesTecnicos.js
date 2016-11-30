"use strict";
const mongoose = require("mongoose");
class DetalleTecnico {
    constructor() {
        this.schema = new mongoose.Schema({
            imagen: String,
            texto: String
        });
        mongoose.model(DetalleTecnico.name, this.schema);
    }
}
DetalleTecnico.current = new DetalleTecnico();
exports.DetalleTecnico = DetalleTecnico;
