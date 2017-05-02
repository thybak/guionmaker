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
var router_1 = require("@angular/router");
var LocalStorageService_1 = require("./utils/LocalStorageService");
var AngularAPIHelper_1 = require("./utils/AngularAPIHelper");
var ng2_breadcrumb_1 = require("ng2-breadcrumb/ng2-breadcrumb");
var AppComponent = (function () {
    function AppComponent(localStorageService, angularAPIHelper, router, breadcrumbService) {
        this.localStorageService = localStorageService;
        this.angularAPIHelper = angularAPIHelper;
        this.router = router;
        this.breadcrumbService = breadcrumbService;
        this.breadcrumbService.hideRouteRegex("^.*([A-Fa-f]|[0-9]){24,24}$");
    }
    AppComponent.prototype.hayProyecto = function () {
        return this.hayUsuario() && this.localStorageService.propiedades['proyectoActual'] != null;
    };
    AppComponent.prototype.hayUsuario = function () {
        return this.angularAPIHelper.usuarioLogeado(this.localStorageService);
    };
    AppComponent.prototype.cerrarSesion = function () {
        this.localStorageService.borrar();
        this.router.navigate(['/login']);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'guionMaker',
        templateUrl: './templates/app.component.html',
        providers: [LocalStorageService_1.LocalStorageService]
    }),
    __metadata("design:paramtypes", [LocalStorageService_1.LocalStorageService, AngularAPIHelper_1.AngularAPIHelper, router_1.Router, ng2_breadcrumb_1.BreadcrumbService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map