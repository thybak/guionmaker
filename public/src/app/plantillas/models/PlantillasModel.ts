"use strict";
import { AngularAPIHelper } from '../../utils/AngularAPIHelper';

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

    public static getHtmlPortada(plantilla: PlantillaModel): string {
        if (plantilla.htmlPortada != undefined && plantilla.htmlPortada.indexOf("{{tituloProyecto}}") >= 0 && plantilla.htmlPortada.indexOf("{{tipoGuion}}") >= 0) {
            return plantilla.htmlPortada;
        }
        return AngularAPIHelper.plantillaPortada;
    }

    public static getHtmlEscena(plantilla: PlantillaModel): string {
        if (plantilla.htmlEscena != undefined && plantilla.htmlEscena.indexOf("{{tituloEscena}}") >= 0 && plantilla.htmlEscena.indexOf("{{contenidoEscena}}") >= 0) {
            return plantilla.htmlEscena;
        }
        return AngularAPIHelper.plantillaEscena;
    }
}