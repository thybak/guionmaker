"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var DetalleLiterario = (function () {
    function DetalleLiterario() {
        this.schema = new mongoose.Schema({
            texto: { type: String, default: new String('') }
        });
    }
    return DetalleLiterario;
}());
DetalleLiterario.current = new DetalleLiterario();
exports.DetalleLiterario = DetalleLiterario;
//# sourceMappingURL=DetallesLiterarios.js.map