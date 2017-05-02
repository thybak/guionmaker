"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var confirmacion_guardado_component_1 = require("./confirmacion-guardado.component");
var lista_generica_component_1 = require("./lista-generica.component");
var botones_guardado_component_1 = require("./botones-guardado.component");
var gestor_subida_component_1 = require("./gestor-subida.component");
var ayuda_diccionarios_component_1 = require("./ayuda-diccionarios.component");
var ng2_summernote_1 = require("ng2-summernote/ng2-summernote");
var ng2_breadcrumb_1 = require("ng2-breadcrumb/ng2-breadcrumb");
var UtilsModule = (function () {
    function UtilsModule() {
    }
    return UtilsModule;
}());
UtilsModule = __decorate([
    core_1.NgModule({
        declarations: [confirmacion_guardado_component_1.ConfirmacionGuardadoComponent, botones_guardado_component_1.BotonesGuardadoComponent, ng2_summernote_1.Ng2Summernote, lista_generica_component_1.ListaGenericaComponent, gestor_subida_component_1.GestorSubidaComponent, ayuda_diccionarios_component_1.AyudaDiccionariosComponent],
        imports: [common_1.CommonModule, forms_1.FormsModule, router_1.RouterModule, ng2_breadcrumb_1.Ng2BreadcrumbModule.forRoot()],
        exports: [confirmacion_guardado_component_1.ConfirmacionGuardadoComponent, botones_guardado_component_1.BotonesGuardadoComponent, ng2_summernote_1.Ng2Summernote, lista_generica_component_1.ListaGenericaComponent, gestor_subida_component_1.GestorSubidaComponent, ayuda_diccionarios_component_1.AyudaDiccionariosComponent, ng2_breadcrumb_1.Ng2BreadcrumbModule]
    })
], UtilsModule);
exports.UtilsModule = UtilsModule;
//# sourceMappingURL=utils.module.js.map