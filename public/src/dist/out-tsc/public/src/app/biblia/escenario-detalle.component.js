var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, KeyValueDiffers } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DetalleElementoBiblia } from "./models/DetalleElementoBiblia";
import { AngularAPIHelper, ResponseStatus } from "../utils/AngularAPIHelper";
import { LocalStorageService } from "../utils/LocalStorageService";
let DetalleEscenarioComponent = class DetalleEscenarioComponent extends DetalleElementoBiblia {
    constructor(angularAPIHelper, localStorageService, route, router, differs) {
        super(angularAPIHelper, localStorageService, route, router, "escenario", differs);
    }
    cargarModelo(respuesta) {
        if (respuesta.estado == ResponseStatus.OK) {
            this.elemento = respuesta.consulta[0];
            this.elemento.ubicacion = this.elemento.ubicacion == undefined || this.elemento.ubicacion == "" ? new String('') : this.elemento.ubicacion;
            this.elemento.descripcion = this.elemento.descripcion == undefined || this.elemento.descripcion == "" ? new String('') : this.elemento.descripcion;
            this.fichero.base64 = this.elemento.imagen == undefined ? "" : this.elemento.imagen;
            this.fichero.mimeType = this.elemento.mimeType == undefined ? "" : this.elemento.mimeType;
        }
    }
};
DetalleEscenarioComponent = __decorate([
    Component({
        selector: 'escenario-detalle',
        templateUrl: './templates/escenario-detalle.component.html',
        providers: [LocalStorageService, AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper, LocalStorageService, ActivatedRoute, Router, KeyValueDiffers])
], DetalleEscenarioComponent);
export { DetalleEscenarioComponent };
//# sourceMappingURL=escenario-detalle.component.js.map