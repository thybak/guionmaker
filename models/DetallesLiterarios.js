"use strict";
const mongoose = require("mongoose");
class DetalleLiterario {
    constructor() {
        this.schema = new mongoose.Schema({
            texto: String
        });
        mongoose.model(DetalleLiterario.name, this.schema);
    }
}
DetalleLiterario.current = new DetalleLiterario();
exports.DetalleLiterario = DetalleLiterario;
