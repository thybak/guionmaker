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
var rxjs_1 = require("rxjs");
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["OK"] = 0] = "OK";
    ResponseStatus[ResponseStatus["KO"] = 1] = "KO";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
var RespuestaJson = (function () {
    function RespuestaJson() {
    }
    return RespuestaJson;
}());
exports.RespuestaJson = RespuestaJson;
var PeticionJson = (function () {
    function PeticionJson(find, sort, select) {
        this.find = find;
        this.sort = sort;
        this.select = select;
    }
    return PeticionJson;
}());
exports.PeticionJson = PeticionJson;
var AngularAPIHelper = AngularAPIHelper_1 = (function () {
    function AngularAPIHelper(http) {
        this.http = http;
    }
    AngularAPIHelper.prototype.handleError = function (error) {
        var errMsg = 'Error en el AngularAPIHelper:' + error;
        return rxjs_1.Observable.throw(errMsg);
    };
    AngularAPIHelper.prototype.cargarConfiguracion = function () {
        return this.http.get('/assets/apiconfig.json').toPromise().
            then(function (config) {
            var _config = config.json();
            AngularAPIHelper_1.maximoSizeByFichero = _config.maxFileSizeBytes;
            AngularAPIHelper_1.URL = _config.apiURL + ':' + _config.publicApiPort + '/api/';
            AngularAPIHelper_1.mimeTypesPermitidos = _config.mimeTypesPermitidos;
        });
    };
    AngularAPIHelper.prototype.usuarioLogeado = function (localStorageService) {
        var usuario = localStorageService.getPropiedad('usuarioLogeado');
        var token = localStorageService.getPropiedad('tokenUsuario');
        return token != undefined && usuario != undefined;
    };
    AngularAPIHelper.prototype.parse = function (response) {
        return JSON.parse(response);
    };
    AngularAPIHelper.prototype.buildPeticion = function (find, sort, select) {
        if (select === void 0) { select = ""; }
        return new PeticionJson(find, sort, select);
    };
    AngularAPIHelper.prototype.crearCabeceraAuth = function () {
        var requestOptions = null;
        var token = localStorage.getItem('tokenUsuario');
        if (token != undefined) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + token });
            requestOptions = new http_1.RequestOptions({ headers: headers });
        }
        return requestOptions;
    };
    AngularAPIHelper.prototype.getAll = function (entity) {
        var _this = this;
        return this.http.get(AngularAPIHelper_1.URL + entity, this.crearCabeceraAuth()).map(function (response) { return _this.parse(response.text()); }).catch(this.handleError);
    };
    AngularAPIHelper.prototype.getById = function (entity, id) {
        var _this = this;
        return this.http.get(AngularAPIHelper_1.URL + entity + "/" + id, this.crearCabeceraAuth()).map(function (response) { return _this.parse(response.text()); }).catch(this.handleError);
    };
    AngularAPIHelper.prototype.deleteById = function (entity, id) {
        var _this = this;
        return this.http.delete(AngularAPIHelper_1.URL + entity + '/' + id, this.crearCabeceraAuth()).map(function (response) { return _this.parse(response.text()); }).catch(this.handleError);
    };
    AngularAPIHelper.prototype.postEntryOrFilter = function (entity, entryOrFilter) {
        var _this = this;
        return this.http.post(AngularAPIHelper_1.URL + entity, JSON.parse(entryOrFilter), this.crearCabeceraAuth()).map(function (response) { return _this.parse(response.text()); }).catch(this.handleError);
    };
    AngularAPIHelper.prototype.mimeTypePermitido = function (mime) {
        var mimeEncontrado = AngularAPIHelper_1.mimeTypesPermitidos.find(function (x) { return x == mime; });
        return mimeEncontrado == mime;
    };
    AngularAPIHelper.prototype.sizeOfFicheroAdecuado = function (size) {
        return size <= AngularAPIHelper_1.maximoSizeByFichero;
    };
    return AngularAPIHelper;
}());
AngularAPIHelper.URL = "";
AngularAPIHelper.maximoSizeByFichero = 0;
AngularAPIHelper.mimeTypesPermitidos = [];
AngularAPIHelper = AngularAPIHelper_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AngularAPIHelper);
exports.AngularAPIHelper = AngularAPIHelper;
var AngularAPIHelper_1;
//# sourceMappingURL=AngularAPIHelper.js.map