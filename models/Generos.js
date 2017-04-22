"use strict";
var mongoose = require("mongoose");
var Genero = (function () {
    function Genero() {
        this.schema = new mongoose.Schema({
            nombre: String
        });
        mongoose.model(Genero.name, this.schema);
    }
    return Genero;
}());
Genero.current = new Genero();
exports.Genero = Genero;
//# sourceMappingURL=Generos.js.map