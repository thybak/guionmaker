"use strict";
const mongoose = require("mongoose");
class DetalleTecnico {
    constructor() {
        this.schema = new mongoose.Schema({
            imagen: String,
            mimeType: String,
            texto: { type: String, default: new String('') }
        });
        mongoose.model(DetalleTecnico.name, this.schema);
    }
}
DetalleTecnico.current = new DetalleTecnico();
exports.DetalleTecnico = DetalleTecnico;
