"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var biblia_component_1 = require("./biblia.component");
var escenarios_lista_component_1 = require("./escenarios-lista.component");
var personajes_lista_component_1 = require("./personajes-lista.component");
var personaje_detalle_component_1 = require("./personaje-detalle.component");
var escenario_detalle_component_1 = require("./escenario-detalle.component");
var bibliaRoutes = [
    {
        path: 'biblia',
        children: [
            { path: '', component: biblia_component_1.BibliaComponent },
            {
                path: 'personajes',
                children: [
                    { path: '', component: personajes_lista_component_1.PersonajesListaComponent },
                    { path: ':id', component: personaje_detalle_component_1.DetallePersonajeComponent }
                ]
            },
            {
                path: 'escenarios',
                children: [
                    { path: '', component: escenarios_lista_component_1.EscenariosListaComponent },
                    { path: ':id', component: escenario_detalle_component_1.DetalleEscenarioComponent }
                ]
            }
        ]
    }
];
var BibliaRoutingModule = (function () {
    function BibliaRoutingModule() {
    }
    return BibliaRoutingModule;
}());
BibliaRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(bibliaRoutes)],
        exports: [router_1.RouterModule]
    })
], BibliaRoutingModule);
exports.BibliaRoutingModule = BibliaRoutingModule;
//# sourceMappingURL=biblia-routing.module.js.map