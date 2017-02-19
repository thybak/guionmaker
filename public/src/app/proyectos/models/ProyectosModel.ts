﻿"use strict";

import { AngularAPIHelper, PeticionJson } from '../../utils/AngularAPIHelper';
import { LocalStorageService } from '../../utils/LocalStorageService';

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
        this.fechaCreacion = new Date();
        this.fechaModificacion = this.fechaCreacion;
        this.cancelado = false;
    }

    public static getProyectosByAutorAndEstado(autor: string, cancelado: boolean = false, angularAPIHelper: AngularAPIHelper) {
        let peticion = angularAPIHelper.buildPeticion({ 'autor': autor, 'cancelado': cancelado }, { 'orden': '1' });
        return angularAPIHelper.postEntryOrFilter('proyectosPorFiltro', JSON.stringify(peticion));
    }
}