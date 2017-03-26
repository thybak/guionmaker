﻿import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { EscenarioModel } from "./models/EscenariosModel";
import { DetalleElementoBiblia } from "./models/DetalleElementoBiblia";

import { Ng2Summernote } from "ng2-summernote/ng2-summernote";
import { GestorSubidaComponent, Fichero } from "../utils/gestor-subida.component";
import { AngularAPIHelper, RespuestaJson, PeticionJson, ResponseStatus } from "../utils/AngularAPIHelper";
import { BotonesGuardado, TipoOperacionGuardado } from "../utils/botones-guardado.component";
import { ConfirmacionGuardado } from "../utils/confirmacion-guardado.component";
import { LocalStorageService } from "../utils/LocalStorageService";

@Component({
    selector: 'escenario-detalle',
    templateUrl: './templates/escenario-detalle.component.html',
    providers: [LocalStorageService, AngularAPIHelper]
})
export class DetalleEscenarioComponent extends DetalleElementoBiblia {
    constructor(angularAPIHelper: AngularAPIHelper, localStorageService: LocalStorageService, route: ActivatedRoute, router: Router) {
        super(angularAPIHelper, localStorageService, route, router, "escenario");
    }
    cargarModelo(respuesta: RespuestaJson) {
        if (respuesta.estado == ResponseStatus.OK) {
            this.elemento = (respuesta as RespuestaJson).consulta[0] as EscenarioModel;
            this.elemento.ubicacion = this.elemento.ubicacion == undefined || this.elemento.ubicacion == "" ? new String('') : this.elemento.ubicacion;
            this.elemento.descripcion = this.elemento.descripcion == undefined || this.elemento.descripcion == "" ? new String('') : this.elemento.descripcion;
            this.fichero.base64 = this.elemento.imagen == undefined ? "" : this.elemento.imagen;
            this.fichero.mimeType = this.elemento.mimeType == undefined ? "" : this.elemento.mimeType;
        }
    }
}