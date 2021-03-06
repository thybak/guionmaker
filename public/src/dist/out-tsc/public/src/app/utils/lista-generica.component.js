"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var AngularAPIHelper_1 = require("./AngularAPIHelper");
var botones_guardado_component_1 = require("./botones-guardado.component");
var LocalStorageService_1 = require("./LocalStorageService");
var ModoColaborador_1 = require("./ModoColaborador");
var ListaGenerica = (function () {
    function ListaGenerica(titulo, entidad, entidadPorFiltro, peticion, nuevoElemento, rutaRetorno, propiedadDestacado) {
        if (rutaRetorno === void 0) { rutaRetorno = ''; }
        if (propiedadDestacado === void 0) { propiedadDestacado = ''; }
        this.titulo = titulo;
        this.entidad = entidad;
        this.entidadPorFiltro = entidadPorFiltro;
        this.peticion = peticion;
        this.nuevoElemento = nuevoElemento;
        this.rutaRetorno = rutaRetorno;
        this.propiedadDestacado = propiedadDestacado;
    }
    return ListaGenerica;
}());
exports.ListaGenerica = ListaGenerica;
var ListaGenericaComponent = (function (_super) {
    __extends(ListaGenericaComponent, _super);
    function ListaGenericaComponent(angularAPIHelper, localStorageService, router) {
        var _this = _super.call(this, angularAPIHelper, localStorageService, angularAPIHelper.esRutaRegistrosUsuario()) || this;
        _this.router = router;
        _this.usuarioLogeadoAutor = _this.angularAPIHelper.esRutaRegistrosUsuario();
        return _this;
    }
    ListaGenericaComponent.prototype.ngOnInit = function () {
        this.cargarElementos();
        this.botonesGuardado = new botones_guardado_component_1.BotonesGuardado();
        if (this.listaGenerica.rutaRetorno.length > 0) {
            this.botonesGuardado.mostrarSoloVolver();
        }
        else {
            this.botonesGuardado.cargarSoloModales();
        }
    };
    ListaGenericaComponent.prototype.cargarElementos = function () {
        var _this = this;
        this.angularAPIHelper.postEntryOrFilter(this.listaGenerica.entidadPorFiltro, JSON.stringify(this.listaGenerica.peticion))
            .subscribe(function (response) {
            var respuesta = response;
            if (respuesta.estado == AngularAPIHelper_1.ResponseStatus.OK) {
                _this.elementos = respuesta.consulta;
            }
        }, function (error) { return console.log(error); });
    };
    ListaGenericaComponent.prototype.onNuevoElemento = function () {
        var _this = this;
        var elemento = this.listaGenerica.nuevoElemento;
        this.angularAPIHelper.postEntryOrFilter(this.listaGenerica.entidad, JSON.stringify(elemento))
            .subscribe(function (response) {
            var respuesta = response;
            if (respuesta.estado == AngularAPIHelper_1.ResponseStatus.OK) {
                _this.elementos.push(respuesta.insertado); // ya incluye el identificador generado en MongoDB.
            }
        });
    };
    ListaGenericaComponent.prototype.setElementoAEliminar = function (elemento) {
        this.elementoAEliminar = elemento;
    };
    ListaGenericaComponent.prototype.eliminarElemento = function () {
        var _this = this;
        this.angularAPIHelper.deleteById(this.listaGenerica.entidad, this.elementoAEliminar._id).subscribe(null, null, function () { return _this.cargarElementos(); });
    };
    ListaGenericaComponent.prototype.onAccionGuardado = function (event) {
        if (event == botones_guardado_component_1.TipoOperacionGuardado.Volver) {
            this.router.navigate([this.listaGenerica.rutaRetorno]);
        }
        else if (event == botones_guardado_component_1.TipoOperacionGuardado.Eliminar) {
            this.eliminarElemento();
        }
    };
    return ListaGenericaComponent;
}(ModoColaborador_1.ModoColaborador));
__decorate([
    core_1.Input(),
    __metadata("design:type", ListaGenerica)
], ListaGenericaComponent.prototype, "listaGenerica", void 0);
ListaGenericaComponent = __decorate([
    core_1.Component({
        selector: 'lista-generica',
        templateUrl: './templates/lista-generica.component.html',
        providers: [AngularAPIHelper_1.AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper_1.AngularAPIHelper, LocalStorageService_1.LocalStorageService, router_1.Router])
], ListaGenericaComponent);
exports.ListaGenericaComponent = ListaGenericaComponent;
//# sourceMappingURL=lista-generica.component.js.map