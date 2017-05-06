"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var pageNotFound_component_1 = require("./pageNotFound.component");
var index_component_1 = require("./index.component");
var login_component_1 = require("./login.component");
var registro_component_1 = require("./registro.component");
var CanActivateIsLoggedGuard_1 = require("./utils/CanActivateIsLoggedGuard");
var appRoutes = [
    { path: '', component: index_component_1.IndexComponent, canActivate: [CanActivateIsLoggedGuard_1.CanActivateIsLoggedGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'registro', component: registro_component_1.RegistroComponent },
    { path: '**', component: pageNotFound_component_1.PageNotFoundComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(appRoutes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map