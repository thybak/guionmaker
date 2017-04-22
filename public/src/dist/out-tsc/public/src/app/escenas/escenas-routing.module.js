"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var escenas_lista_component_1 = require("./escenas-lista.component");
var escena_detalle_component_1 = require("./escena-detalle.component");
var escenasRoutes = [
    {
        path: 'escenas',
        children: [
            { path: '', component: escenas_lista_component_1.EscenasListComponent },
            { path: ':id', component: escena_detalle_component_1.DetalleEscenaComponent }
        ]
    },
];
var EscenasRoutingModule = (function () {
    function EscenasRoutingModule() {
    }
    return EscenasRoutingModule;
}());
EscenasRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(escenasRoutes)],
        exports: [router_1.RouterModule]
    })
], EscenasRoutingModule);
exports.EscenasRoutingModule = EscenasRoutingModule;
//# sourceMappingURL=escenas-routing.module.js.map