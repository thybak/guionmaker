import * as jssha from "jssha";

export class Utils {
    static firmarTexto(texto: string): string {
        let oJssha = new jssha("SHA3-256", "TEXT");
        oJssha.update(texto);
        return oJssha.getHash("HEX");
    }
    static diferenciaDiasEntre(fechaVieja: Date, fechaNueva: Date){
        return (fechaNueva.getTime() - fechaVieja.getTime()) / (1000 * 3600 * 24);
    }
}

export class PeticionLogin {
    nombreUsuario: string;
    pass: string;

    constructor(nombreUsuario: string = "", pass: string = "") {
        this.nombreUsuario = nombreUsuario;
        this.pass = pass;
    }
}

export class RespuestaLogin {
    tokenUsuario: string;
    usuarioLogeado: string;
    nombreUsuario: string;

    constructor(tokenUsuario: string, usuarioLogeado: string, nombreUsuario: string) {
        this.tokenUsuario = tokenUsuario;
        this.usuarioLogeado = usuarioLogeado;
        this.nombreUsuario = nombreUsuario;
    }
}