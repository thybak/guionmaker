"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Usuario = (function () {
    function Usuario() {
        this.schema = new mongoose.Schema({
            nombre: { type: String, required: true },
            apellidos: { type: String, required: true },
            email: { type: String, required: true },
            nombreUsuario: { type: String, required: true },
            pass: { type: String, required: true },
        }, { collection: 'usuarios' });
        this.schema.index({ nombreUsuario: 1 }, { unique: true });
        this.schema.index({ email: 1 }, { unique: true });
        mongoose.model(Usuario.name, this.schema);
    }
    return Usuario;
}());
Usuario.current = new Usuario();
exports.Usuario = Usuario;
//# sourceMappingURL=Usuarios.js.map