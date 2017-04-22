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
var angular_sortablejs_1 = require("angular-sortablejs");
var utils_module_1 = require("../utils/utils.module");
var escenas_routing_module_1 = require("./escenas-routing.module");
var escenas_lista_component_1 = require("./escenas-lista.component");
var escena_detalle_component_1 = require("./escena-detalle.component");
var EscenasModule = (function () {
    function EscenasModule() {
    }
    return EscenasModule;
}());
EscenasModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, angular_sortablejs_1.SortablejsModule, utils_module_1.UtilsModule, escenas_routing_module_1.EscenasRoutingModule],
        declarations: [escenas_lista_component_1.EscenasListComponent, escena_detalle_component_1.DetalleEscenaComponent],
        providers: [],
        exports: [escenas_lista_component_1.EscenasListComponent]
    })
], EscenasModule);
exports.EscenasModule = EscenasModule;
//# sourceMappingURL=escenas.module.js.map