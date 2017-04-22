"use strict";
var mongoose = require("mongoose");
var DetalleLiterario = (function () {
    function DetalleLiterario() {
        this.schema = new mongoose.Schema({
            texto: { type: String, default: new String('') }
        });
        mongoose.model(DetalleLiterario.name, this.schema);
    }
    return DetalleLiterario;
}());
DetalleLiterario.current = new DetalleLiterario();
exports.DetalleLiterario = DetalleLiterario;
//# sourceMappingURL=DetallesLiterarios.js.map