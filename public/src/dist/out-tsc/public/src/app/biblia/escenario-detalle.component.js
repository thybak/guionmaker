"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var DetalleElementoBiblia_1 = require("./models/DetalleElementoBiblia");
var AngularAPIHelper_1 = require("../utils/AngularAPIHelper");
var LocalStorageService_1 = require("../utils/LocalStorageService");
var DetalleEscenarioComponent = (function (_super) {
    __extends(DetalleEscenarioComponent, _super);
    function DetalleEscenarioComponent(angularAPIHelper, localStorageService, route, router, differs) {
        return _super.call(this, angularAPIHelper, localStorageService, route, router, "escenario", differs) || this;
    }
    DetalleEscenarioComponent.prototype.cargarModelo = function (respuesta) {
        if (respuesta.estado == AngularAPIHelper_1.ResponseStatus.OK) {
            this.elemento = respuesta.consulta[0];
            this.elemento.ubicacion = this.elemento.ubicacion == undefined || this.elemento.ubicacion == "" ? new String('') : this.elemento.ubicacion;
            this.elemento.descripcion = this.elemento.descripcion == undefined || this.elemento.descripcion == "" ? new String('') : this.elemento.descripcion;
            this.fichero.base64 = this.elemento.imagen == undefined ? "" : this.elemento.imagen;
            this.fichero.mimeType = this.elemento.mimeType == undefined ? "" : this.elemento.mimeType;
        }
    };
    return DetalleEscenarioComponent;
}(DetalleElementoBiblia_1.DetalleElementoBiblia));
DetalleEscenarioComponent = __decorate([
    core_1.Component({
        selector: 'escenario-detalle',
        templateUrl: './templates/escenario-detalle.component.html',
        providers: [LocalStorageService_1.LocalStorageService, AngularAPIHelper_1.AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper_1.AngularAPIHelper, LocalStorageService_1.LocalStorageService, router_1.ActivatedRoute, router_1.Router, core_1.KeyValueDiffers])
], DetalleEscenarioComponent);
exports.DetalleEscenarioComponent = DetalleEscenarioComponent;
//# sourceMappingURL=escenario-detalle.component.js.map