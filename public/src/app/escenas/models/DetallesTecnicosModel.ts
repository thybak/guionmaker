"use strict";

export class DetalleTecnicoModel {
    _id: string;
    imagen: string;
    mimeType: string;
    texto: String;

    constructor() {
        this.texto = new String('');
    }

    static getDataUrl(detalle: any): string {
        let dataUrl: string = "#";
        if (detalle.imagen != undefined && detalle.mimeType != undefined) {
            dataUrl = "data:" + detalle.mimeType + ";base64," + detalle.imagen;
        }
        return dataUrl;
    }
}