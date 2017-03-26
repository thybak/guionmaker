"use strict";

export class EscenarioModel {
    _id: string;
    nombre: string;
    ubicacion: string;
    descripcion: string;
    proyecto: string;
    imagen: string;
    mimeType: string;

    constructor() {
        this.nombre = "Nuevo escenario";
    }
}
