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
var PlantillasModel_1 = require("./models/PlantillasModel");
var AngularAPIHelper_1 = require("../utils/AngularAPIHelper");
var lista_generica_component_1 = require("../utils/lista-generica.component");
var LocalStorageService_1 = require("../utils/LocalStorageService");
var PlantillasListComponent = (function () {
    function PlantillasListComponent(angularAPIHelper, localStorageService) {
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        var nuevaPlantilla = new PlantillasModel_1.PlantillaModel();
        nuevaPlantilla.autor = this.localStorageService.getPropiedad('usuarioLogeado');
        this.listaGenerica = new lista_generica_component_1.ListaGenerica("Listado de plantillas disponibles para este usuario", "plantilla", "plantillasPorFiltro", this.angularAPIHelper.buildPeticion({}, {}), nuevaPlantilla, '', "porDefecto");
    }
    return PlantillasListComponent;
}());
PlantillasListComponent = __decorate([
    core_1.Component({
        selector: 'lista-plantillas',
        templateUrl: './templates/plantillas-lista.component.html',
        providers: [AngularAPIHelper_1.AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper_1.AngularAPIHelper, LocalStorageService_1.LocalStorageService])
], PlantillasListComponent);
exports.PlantillasListComponent = PlantillasListComponent;
//# sourceMappingURL=plantillas-lista.component.js.map