import { Component, DoCheck, KeyValueDiffers } from "@angular/core";
import { AngularAPIHelper, RespuestaJson, ResponseStatus } from "../utils/AngularAPIHelper";
import { LocalStorageService } from "../utils/LocalStorageService";
import { DetalleElemento } from "../utils/DetalleElemento";
import { PlantillaModel } from "./models/PlantillasModel";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: "detalle-plantilla",
    templateUrl: "./templates/plantilla-detalle.component.html",
    providers: [AngularAPIHelper]
})
export class PlantillaDetalleComponent extends DetalleElemento {

    constructor(angularAPIHelper: AngularAPIHelper, localStorageService: LocalStorageService, router: Router, route: ActivatedRoute, differs: KeyValueDiffers) {
        super(angularAPIHelper, localStorageService, route, router, "plantilla", differs, "/plantillas"); 
    }

    cargarModelo(respuesta: RespuestaJson) {
        if (respuesta.estado == ResponseStatus.OK && respuesta.consulta != undefined) {
            this.elemento = respuesta.consulta[0] as PlantillaModel;
        }
    }
}