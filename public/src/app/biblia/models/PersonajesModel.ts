"use strict";

export class PersonajeModel {
    _id: string;
    nombre: string;
    edad: number;
    procedencia: string;
    biografia: String;
    descripcionFisica: String;
    descripcionPsicologica: String;
    proyecto: string;
    imagen: string;
    mimeType: string;

    constructor() {
        this.nombre = "Nuevo personaje";
        this.edad = 0;
    }
}