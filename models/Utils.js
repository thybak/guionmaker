"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jssha = require("jssha");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.firmarTexto = function (texto) {
        var oJssha = new jssha("SHA3-256", "TEXT");
        oJssha.update(texto);
        return oJssha.getHash("HEX");
    };
    return Utils;
}());
exports.Utils = Utils;
var PeticionLogin = /** @class */ (function () {
    function PeticionLogin(nombreUsuario, pass) {
        if (nombreUsuario === void 0) { nombreUsuario = ""; }
        if (pass === void 0) { pass = ""; }
        this.nombreUsuario = nombreUsuario;
        this.pass = pass;
    }
    return PeticionLogin;
}());
exports.PeticionLogin = PeticionLogin;
var RespuestaLogin = /** @class */ (function () {
    function RespuestaLogin(tokenUsuario, usuarioLogeado, nombreUsuario) {
        this.tokenUsuario = tokenUsuario;
        this.usuarioLogeado = usuarioLogeado;
        this.nombreUsuario = nombreUsuario;
    }
    return RespuestaLogin;
}());
exports.RespuestaLogin = RespuestaLogin;
//# sourceMappingURL=Utils.js.map