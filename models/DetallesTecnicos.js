"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var DetalleTecnico = (function () {
    function DetalleTecnico() {
        this.schema = new mongoose.Schema({
            imagen: String,
            mimeType: String,
            texto: { type: String, default: new String('') }
        });
        mongoose.model(DetalleTecnico.name, this.schema);
    }
    return DetalleTecnico;
}());
DetalleTecnico.current = new DetalleTecnico();
exports.DetalleTecnico = DetalleTecnico;
//# sourceMappingURL=DetallesTecnicos.js.map