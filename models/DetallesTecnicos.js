"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var DetalleTecnico = /** @class */ (function () {
    function DetalleTecnico() {
        this.schema = new mongoose.Schema({
            imagen: String,
            mimeType: String,
            texto: { type: String, default: new String('') }
        });
    }
    DetalleTecnico.current = new DetalleTecnico();
    return DetalleTecnico;
}());
exports.DetalleTecnico = DetalleTecnico;
//# sourceMappingURL=DetallesTecnicos.js.map