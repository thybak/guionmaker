"use strict";

export enum TipoPlantilla {
    Portada = 0,
    Escena = 1
}

export class PlantillaModel {
    _id: string;
    html: string;
    tipo: number;
    autor: string;
    fechaCreacion: Date;
    fechaModificacion: Date;
}