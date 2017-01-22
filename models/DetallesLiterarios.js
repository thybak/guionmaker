"use strict";
const mongoose = require("mongoose");
class DetalleLiterario {
    constructor() {
        this.schema = new mongoose.Schema({
            texto: { type: String, default: new String('') }
        });
        mongoose.model(DetalleLiterario.name, this.schema);
    }
}
DetalleLiterario.current = new DetalleLiterario();
exports.DetalleLiterario = DetalleLiterario;
