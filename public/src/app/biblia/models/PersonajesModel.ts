﻿"use strict";

export class PersonajeModel {
    nombre: string;
    edad: number;
    procedencia: string;
    biografia: string;
    descripcionFisica: string;
    descripcionLogica: string;
    proyecto: string;
    imagen: string;
    mimeType: string;

    constructor() {
        this.nombre = "Nuevo personaje";
        this.edad = 0;
    }
}