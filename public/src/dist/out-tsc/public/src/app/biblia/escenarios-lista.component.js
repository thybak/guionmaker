"use strict";
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
var AngularAPIHelper_1 = require("../utils/AngularAPIHelper");
var lista_generica_component_1 = require("../utils/lista-generica.component");
var LocalStorageService_1 = require("../utils/LocalStorageService");
var EscenariosModel_1 = require("./models/EscenariosModel");
var EscenariosListaComponent = (function () {
    function EscenariosListaComponent(angularAPIHelper, localStorageService) {
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        var nuevoEscenario = new EscenariosModel_1.EscenarioModel();
        nuevoEscenario.proyecto = this.localStorageService.getPropiedad('proyectoActual');
        this.listaGenerica = new lista_generica_component_1.ListaGenerica("Listado de escenarios de la biblia literaria", "escenario", "escenariosPorFiltro", this.angularAPIHelper.buildPeticion({ proyecto: this.localStorageService.getPropiedad('proyectoActual') }, {}, "nombre proyecto"), nuevoEscenario);
    }
    return EscenariosListaComponent;
}());
EscenariosListaComponent = __decorate([
    core_1.Component({
        selector: 'escenarios-lista',
        templateUrl: './templates/escenarios-lista.component.html',
        providers: [LocalStorageService_1.LocalStorageService, AngularAPIHelper_1.AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper_1.AngularAPIHelper, LocalStorageService_1.LocalStorageService])
], EscenariosListaComponent);
exports.EscenariosListaComponent = EscenariosListaComponent;
//# sourceMappingURL=escenarios-lista.component.js.map