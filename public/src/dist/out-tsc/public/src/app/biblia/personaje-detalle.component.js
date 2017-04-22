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
let DetallePersonajeComponent = class DetallePersonajeComponent extends DetalleElementoBiblia {
    constructor(angularAPIHelper, localStorageService, route, router, differs) {
        super(angularAPIHelper, localStorageService, route, router, "personaje", differs);
    }
    cargarModelo(respuesta) {
        if (respuesta.estado == ResponseStatus.OK) {
            this.elemento = respuesta.consulta[0];
            this.elemento.biografia = this.elemento.biografia == undefined || this.elemento.biografia == "" ? new String('') : this.elemento.biografia;
            this.elemento.descripcionFisica = this.elemento.descripcionFisica == undefined || this.elemento.descripcionFisica == "" ? new String('') : this.elemento.descripcionFisica;
            this.elemento.descripcionPsicologica = this.elemento.descripcionPsicologica == undefined || this.elemento.descripcionPsicologica == "" ? new String('') : this.elemento.descripcionPsicologica;
            this.fichero.base64 = this.elemento.imagen == undefined ? "" : this.elemento.imagen;
            this.fichero.mimeType = this.elemento.mimeType == undefined ? "" : this.elemento.mimeType;
        }
    }
};
DetallePersonajeComponent = __decorate([
    Component({
        selector: 'detalle-personaje',
        templateUrl: './templates/personaje-detalle.component.html',
        providers: [LocalStorageService, AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper, LocalStorageService, ActivatedRoute, Router, KeyValueDiffers])
], DetallePersonajeComponent);
export { DetallePersonajeComponent };
//# sourceMappingURL=personaje-detalle.component.js.map