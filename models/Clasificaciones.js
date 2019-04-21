"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Clasificacion = /** @class */ (function () {
    function Clasificacion() {
        this.schema = new mongoose.Schema({
            nombre: String
        });
        mongoose.model(Clasificacion.name, this.schema);
    }
    Clasificacion.current = new Clasificacion();
    return Clasificacion;
}());
exports.Clasificacion = Clasificacion;
//# sourceMappingURL=Clasificaciones.js.map