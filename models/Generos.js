"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Genero = /** @class */ (function () {
    function Genero() {
        this.schema = new mongoose.Schema({
            nombre: String
        });
        mongoose.model(Genero.name, this.schema);
    }
    Genero.current = new Genero();
    return Genero;
}());
exports.Genero = Genero;
//# sourceMappingURL=Generos.js.map