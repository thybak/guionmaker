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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var AyudaDiccionariosComponent = (function () {
    function AyudaDiccionariosComponent(domSanitizer, http) {
        this.domSanitizer = domSanitizer;
        this.http = http;
        this.iniURLRAE = "http://dle.rae.es/srv/search?w={0}&m=10";
        this.iniURLWR = "http://www.wordreference.com/sinonimos/{0}";
    }
    AyudaDiccionariosComponent.prototype.cambiarURLAcepciones = function () {
        window.open(this.iniURLRAE.replace("{0}", this.palabraAcepcion));
    };
    AyudaDiccionariosComponent.prototype.cambiarURLSinonimos = function () {
        window.open(this.iniURLWR.replace("{0}", this.palabraSinonimo));
    };
    return AyudaDiccionariosComponent;
}());
AyudaDiccionariosComponent = __decorate([
    core_1.Component({
        templateUrl: './templates/ayuda-diccionarios.component.html',
        selector: 'ayuda-diccionarios'
    }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer, http_1.Http])
], AyudaDiccionariosComponent);
exports.AyudaDiccionariosComponent = AyudaDiccionariosComponent;
//# sourceMappingURL=ayuda-diccionarios.component.js.map