"use strict";

export class PlantillaModel {
    _id: string;
    nombre: string;
    htmlPortada: string;
    htmlEscena: string;
    autor: string;
    porDefecto: boolean;
    fechaCreacion: Date;
    fechaModificacion: Date;

    constructor() {
        this.nombre = "Nueva plantilla";
        this.fechaCreacion = new Date();
    }
}