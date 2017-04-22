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
var biblia_routing_module_1 = require("./biblia-routing.module");
var biblia_component_1 = require("./biblia.component");
var escenarios_lista_component_1 = require("./escenarios-lista.component");
var personajes_lista_component_1 = require("./personajes-lista.component");
var personaje_detalle_component_1 = require("./personaje-detalle.component");
var escenario_detalle_component_1 = require("./escenario-detalle.component");
var BibliaModule = (function () {
    function BibliaModule() {
    }
    return BibliaModule;
}());
BibliaModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, utils_module_1.UtilsModule, biblia_routing_module_1.BibliaRoutingModule],
        declarations: [biblia_component_1.BibliaComponent, escenarios_lista_component_1.EscenariosListaComponent, personajes_lista_component_1.PersonajesListaComponent, personaje_detalle_component_1.DetallePersonajeComponent, escenario_detalle_component_1.DetalleEscenarioComponent]
    })
], BibliaModule);
exports.BibliaModule = BibliaModule;
//# sourceMappingURL=biblia.module.js.map