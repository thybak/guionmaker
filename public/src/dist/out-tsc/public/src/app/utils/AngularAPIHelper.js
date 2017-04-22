var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["OK"] = 0] = "OK";
    ResponseStatus[ResponseStatus["KO"] = 1] = "KO";
})(ResponseStatus || (ResponseStatus = {}));
export class RespuestaJson {
}
export class PeticionJson {
    constructor(find, sort, select) {
        this.find = find;
        this.sort = sort;
        this.select = select;
    }
}
let AngularAPIHelper = AngularAPIHelper_1 = class AngularAPIHelper {
    constructor(http) {
        this.http = http;
    }
    handleError(error) {
        let errMsg = 'Error en el AngularAPIHelper:' + error;
        return Observable.throw(errMsg);
    }
    cargarConfiguracion() {
        return this.http.get('/assets/apiconfig.json').toPromise().
            then(config => {
            let _config = config.json();
            AngularAPIHelper_1.maximoSizeByFichero = _config.maxFileSizeBytes;
            AngularAPIHelper_1.URL = _config.apiURL + ':' + _config.publicApiPort + '/api/';
            AngularAPIHelper_1.mimeTypesPermitidos = _config.mimeTypesPermitidos;
        });
    }
    usuarioLogeado(localStorageService) {
        let usuario = localStorageService.getPropiedad('usuarioLogeado');
        let token = localStorageService.getPropiedad('tokenUsuario');
        return token != undefined && usuario != undefined;
    }
    parse(response) {
        return JSON.parse(response);
    }
    buildPeticion(find, sort, select = "") {
        return new PeticionJson(find, sort, select);
    }
    crearCabeceraAuth() {
        let requestOptions = null;
        let token = localStorage.getItem('tokenUsuario');
        if (token != undefined) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            requestOptions = new RequestOptions({ headers: headers });
        }
        return requestOptions;
    }
    getAll(entity) {
        return this.http.get(AngularAPIHelper_1.URL + entity, this.crearCabeceraAuth()).map(response => this.parse(response.text())).catch(this.handleError);
    }
    getById(entity, id) {
        return this.http.get(AngularAPIHelper_1.URL + entity + "/" + id, this.crearCabeceraAuth()).map(response => this.parse(response.text())).catch(this.handleError);
    }
    deleteById(entity, id) {
        return this.http.delete(AngularAPIHelper_1.URL + entity + '/' + id, this.crearCabeceraAuth()).map(response => this.parse(response.text())).catch(this.handleError);
    }
    postEntryOrFilter(entity, entryOrFilter) {
        return this.http.post(AngularAPIHelper_1.URL + entity, JSON.parse(entryOrFilter), this.crearCabeceraAuth()).map(response => this.parse(response.text())).catch(this.handleError);
    }
    mimeTypePermitido(mime) {
        let mimeEncontrado = AngularAPIHelper_1.mimeTypesPermitidos.find(x => x == mime);
        return mimeEncontrado == mime;
    }
    sizeOfFicheroAdecuado(size) {
        return size <= AngularAPIHelper_1.maximoSizeByFichero;
    }
};
AngularAPIHelper.URL = "";
AngularAPIHelper.maximoSizeByFichero = 0;
AngularAPIHelper.mimeTypesPermitidos = [];
AngularAPIHelper = AngularAPIHelper_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AngularAPIHelper);
export { AngularAPIHelper };
var AngularAPIHelper_1;
//# sourceMappingURL=AngularAPIHelper.js.map