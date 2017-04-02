"use strict";
const jssha = require("jssha");
class Utils {
    static firmarTexto(texto) {
        let oJssha = new jssha("SHA3-256", "TEXT");
        oJssha.update(texto);
        return oJssha.getHash("HEX");
    }
}
exports.Utils = Utils;
class PeticionLogin {
    constructor(nombreUsuario = "", pass = "") {
        this.nombreUsuario = nombreUsuario;
        this.pass = pass;
    }
}
exports.PeticionLogin = PeticionLogin;
class RespuestaLogin {
    constructor(tokenUsuario, usuarioLogeado) {
        this.tokenUsuario = tokenUsuario;
        this.usuarioLogeado = usuarioLogeado;
    }
}
exports.RespuestaLogin = RespuestaLogin;
