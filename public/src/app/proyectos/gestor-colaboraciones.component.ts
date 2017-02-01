"use strict";

import { Component, Input } from "@angular/core";
import { ColaboracionModel } from "./models/ColaboracionesModel";
import { AngularAPIHelper, RespuestaJson } from "../utils/AngularAPIHelper";

export class GestorColaboraciones {
    colaboraciones: ColaboracionModel[];
    angularAPIHelper: AngularAPIHelper;

    constructor(angularAPIHelper: AngularAPIHelper, proyectoID: string) {
        this.angularAPIHelper = angularAPIHelper;
        this.getFromProyectoID(proyectoID);
    }

    getFromProyectoID(proyectoID: string) {
        let peticion = this.angularAPIHelper.buildPeticion({ "proyecto": proyectoID }, {});
        this.angularAPIHelper.postEntryOrFilter('colaboracionesPorFiltro', JSON.stringify(peticion))
            .subscribe(response => { this.colaboraciones = (response as RespuestaJson).consulta as ColaboracionModel[]; });
    }
}

@Component({
    selector: "gestor-colaboraciones",
    templateUrl: "./templates/gestor-colaboraciones.component.html",
    providers: [AngularAPIHelper]
})
export class GestorColaboracionesComponent {
    @Input()
    gestorColaboraciones: GestorColaboraciones;
}
