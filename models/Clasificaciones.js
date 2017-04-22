"use strict";
var mongoose = require("mongoose");
var Clasificacion = (function () {
    function Clasificacion() {
        this.schema = new mongoose.Schema({
            nombre: String
        });
        mongoose.model(Clasificacion.name, this.schema);
    }
    return Clasificacion;
}());
Clasificacion.current = new Clasificacion();
exports.Clasificacion = Clasificacion;
//# sourceMappingURL=Clasificaciones.js.map