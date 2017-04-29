"use strict";

import { AngularAPIHelper, PeticionJson, ResponseStatus, RespuestaJson } from '../../utils/AngularAPIHelper';
import { LocalStorageService } from '../../utils/LocalStorageService';
import { ColaboracionModel } from './ColaboracionesModel';

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
    colaboradores: ColaboracionModel[];

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

    public static getProyectoActual(angularAPIHelper: AngularAPIHelper, localStorageService: LocalStorageService) {
        return angularAPIHelper.getById("proyecto", localStorageService.getPropiedad("proyectoActual"));
    }

}