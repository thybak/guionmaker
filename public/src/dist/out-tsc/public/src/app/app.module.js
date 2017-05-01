"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var escenas_module_1 = require("./escenas/escenas.module");
var proyectos_module_1 = require("./proyectos/proyectos.module");
var utils_module_1 = require("./utils/utils.module");
var biblia_module_1 = require("./biblia/biblia.module");
var plantillas_module_1 = require("./plantillas/plantillas.module");
var app_routing_module_1 = require("./app-routing.module");
var AngularAPIHelper_1 = require("./utils/AngularAPIHelper");
var app_component_1 = require("./app.component");
var pageNotFound_component_1 = require("./pageNotFound.component");
var index_component_1 = require("./index.component");
var login_component_1 = require("./login.component");
var registro_component_1 = require("./registro.component");
function cargarConfiguracion(api, injector) {
    return function () { return api.cargarConfiguracion(injector); };
}
exports.cargarConfiguracion = cargarConfiguracion;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [app_component_1.AppComponent, pageNotFound_component_1.PageNotFoundComponent, index_component_1.IndexComponent, login_component_1.LoginComponent, registro_component_1.RegistroComponent],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            escenas_module_1.EscenasModule,
            proyectos_module_1.ProyectosModule,
            utils_module_1.UtilsModule,
            biblia_module_1.BibliaModule,
            plantillas_module_1.PlantillasModule,
            app_routing_module_1.AppRoutingModule
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [AngularAPIHelper_1.AngularAPIHelper,
            {
                provide: core_1.APP_INITIALIZER,
                useFactory: cargarConfiguracion,
                deps: [AngularAPIHelper_1.AngularAPIHelper, core_1.Injector],
                multi: true
            }]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map