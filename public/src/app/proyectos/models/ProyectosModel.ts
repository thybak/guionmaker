"use strict";

export class ProyectoModel {
    _id: string;
    nombre: string;
    sinopsis: String;
    genero: string;
    clasificacion: string;
    autor: string;
    publico: boolean;
    fechaCreacion: Date;
    fechaModificacion: Date;
    cancelado: boolean;

    constructor() {
        this.nombre = "Nuevo proyecto";
        this.autor = "582e0dbffb1e5a33184cdf39";
        this.fechaCreacion = new Date();
        this.fechaModificacion = this.fechaCreacion;
        this.cancelado = false;
    }
}