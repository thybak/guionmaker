"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var utils_module_1 = require("../utils/utils.module");
var plantillas_routing_module_1 = require("./plantillas-routing.module");
var plantillas_lista_component_1 = require("./plantillas-lista.component");
var plantilla_detalle_component_1 = require("./plantilla-detalle.component");
var PlantillasModule = (function () {
    function PlantillasModule() {
    }
    return PlantillasModule;
}());
PlantillasModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, utils_module_1.UtilsModule, plantillas_routing_module_1.PlantillasRoutingModule],
        declarations: [plantillas_lista_component_1.PlantillasListComponent, plantilla_detalle_component_1.PlantillaDetalleComponent],
        providers: [],
        exports: []
    })
], PlantillasModule);
exports.PlantillasModule = PlantillasModule;
//# sourceMappingURL=plantillas.module.js.map