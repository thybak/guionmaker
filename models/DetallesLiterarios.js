"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var DetalleLiterario = /** @class */ (function () {
    function DetalleLiterario() {
        this.schema = new mongoose.Schema({
            texto: { type: String, default: new String('') }
        });
    }
    DetalleLiterario.current = new DetalleLiterario();
    return DetalleLiterario;
}());
exports.DetalleLiterario = DetalleLiterario;
//# sourceMappingURL=DetallesLiterarios.js.map