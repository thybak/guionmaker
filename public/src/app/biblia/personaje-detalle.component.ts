import { Component, KeyValueDiffers } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { PersonajeModel } from "./models/PersonajesModel";
import { DetalleElementoBiblia } from "./models/DetalleElementoBiblia";

import { Ng2Summernote } from "ng2-summernote/ng2-summernote";
import { GestorSubidaComponent, Fichero } from "../utils/gestor-subida.component";
import { AngularAPIHelper, RespuestaJson, PeticionJson, ResponseStatus } from "../utils/AngularAPIHelper";
import { BotonesGuardado, TipoOperacionGuardado } from "../utils/botones-guardado.component";
import { ConfirmacionGuardado } from "../utils/confirmacion-guardado.component";
import { LocalStorageService } from "../utils/LocalStorageService";
import { AyudaDiccionariosComponent } from "../utils/ayuda-diccionarios.component";

@Component({
    selector: 'detalle-personaje',
    templateUrl: './templates/personaje-detalle.component.html',
    providers: [LocalStorageService, AngularAPIHelper]
})
export class DetallePersonajeComponent extends DetalleElementoBiblia {
    constructor(angularAPIHelper: AngularAPIHelper, localStorageService: LocalStorageService, route: ActivatedRoute, router: Router, differs: KeyValueDiffers) {
        super(angularAPIHelper, localStorageService, route, router, "personaje", differs);
    }
    cargarModelo(respuesta: RespuestaJson) {
        if (respuesta.estado == ResponseStatus.OK) {
            this.elemento = (respuesta as RespuestaJson).consulta[0] as PersonajeModel;
            this.elemento.biografia = this.elemento.biografia == undefined || this.elemento.biografia == "" ? new String('') : this.elemento.biografia;
            this.elemento.descripcionFisica = this.elemento.descripcionFisica == undefined || this.elemento.descripcionFisica == "" ? new String('') : this.elemento.descripcionFisica;
            this.elemento.descripcionPsicologica = this.elemento.descripcionPsicologica == undefined || this.elemento.descripcionPsicologica == "" ? new String('') : this.elemento.descripcionPsicologica;
            this.fichero.base64 = this.elemento.imagen == undefined ? "" : this.elemento.imagen;
            this.fichero.mimeType = this.elemento.mimeType == undefined ? "" : this.elemento.mimeType;
        }
    }
}