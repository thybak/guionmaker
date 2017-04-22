"use strict";
var jssha = require("jssha");
var Utils = (function () {
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
var PeticionLogin = (function () {
    function PeticionLogin(nombreUsuario, pass) {
        if (nombreUsuario === void 0) { nombreUsuario = ""; }
        if (pass === void 0) { pass = ""; }
        this.nombreUsuario = nombreUsuario;
        this.pass = pass;
    }
    return PeticionLogin;
}());
exports.PeticionLogin = PeticionLogin;
var RespuestaLogin = (function () {
    function RespuestaLogin(tokenUsuario, usuarioLogeado) {
        this.tokenUsuario = tokenUsuario;
        this.usuarioLogeado = usuarioLogeado;
    }
    return RespuestaLogin;
}());
exports.RespuestaLogin = RespuestaLogin;
//# sourceMappingURL=Utils.js.map