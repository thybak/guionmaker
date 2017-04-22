import * as jssha from "jssha";
export class Utils {
    static firmarTexto(texto) {
        let oJssha = new jssha("SHA3-256", "TEXT");
        oJssha.update(texto);
        return oJssha.getHash("HEX");
    }
}
export class PeticionLogin {
    constructor(nombreUsuario = "", pass = "") {
        this.nombreUsuario = nombreUsuario;
        this.pass = pass;
    }
}
export class RespuestaLogin {
    constructor(tokenUsuario, usuarioLogeado) {
        this.tokenUsuario = tokenUsuario;
        this.usuarioLogeado = usuarioLogeado;
    }
}
//# sourceMappingURL=Utils.js.map