"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var plantillas_lista_component_1 = require("./plantillas-lista.component");
//import { DetalleEscenaComponent } from './escena-detalle.component';
var plantillasRoute = [
    {
        path: 'plantillas',
        children: [
            { path: '', component: plantillas_lista_component_1.PlantillasListComponent } //,
        ]
    },
];
var PlantillasRoutingModule = (function () {
    function PlantillasRoutingModule() {
    }
    return PlantillasRoutingModule;
}());
PlantillasRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(plantillasRoute)],
        exports: [router_1.RouterModule]
    })
], PlantillasRoutingModule);
exports.PlantillasRoutingModule = PlantillasRoutingModule;
//# sourceMappingURL=plantillas-routing.module.js.map