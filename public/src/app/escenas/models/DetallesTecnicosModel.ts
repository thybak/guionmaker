"use strict";

export class DetalleTecnicoModel {
    _id: string;
    imagen: string;
    mimeType: string;
    texto: String;

    constructor() {
        this.texto = new String('');
    }
}