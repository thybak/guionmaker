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
var EscenasModel_1 = require("./models/EscenasModel");
var AngularAPIHelper_1 = require("../utils/AngularAPIHelper");
var LocalStorageService_1 = require("../utils/LocalStorageService");
var confirmacion_guardado_component_1 = require("../utils/confirmacion-guardado.component");
var botones_guardado_component_1 = require("../utils/botones-guardado.component");
var PlantillasModel_1 = require("../plantillas/models/PlantillasModel");
var ModoColaborador_1 = require("../utils/ModoColaborador");
var EscenasListComponent = (function (_super) {
    __extends(EscenasListComponent, _super);
    function EscenasListComponent(angularAPIHelper, localStorageService) {
        var _this = _super.call(this, angularAPIHelper, localStorageService) || this;
        _this.sortOptions = {
            animation: 150
        };
        _this.confirmacionGuardado = new confirmacion_guardado_component_1.ConfirmacionGuardado();
        _this.confirmacionGuardado.multiguardado = true;
        _this.botonesGuardado = new botones_guardado_component_1.BotonesGuardado();
        _this.cargarEscenas();
        return _this;
    }
    EscenasListComponent.prototype.guardarCambios = function () {
        var _this = this;
        var _loop_1 = function (escena) {
            var escenaaux = escena;
            this_1.angularAPIHelper.postEntryOrFilter('escena/actualizar', JSON.stringify(escenaaux)).subscribe(null, function (error) { return _this.confirmacionGuardado.setEstadoMultiguardado(escenaaux.titulo, false); }, function () {
                _this.confirmacionGuardado.setEstadoMultiguardado(escenaaux.titulo, true);
                _this.cargarEscenas();
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.escenas; _i < _a.length; _i++) {
            var escena = _a[_i];
            _loop_1(escena);
        }
    };
    EscenasListComponent.prototype.cambiarOrdenEscenas = function () {
        var idx = 1;
        for (var _i = 0, _a = this.escenas; _i < _a.length; _i++) {
            var escena = _a[_i];
            escena.orden = idx++;
        }
    };
    EscenasListComponent.prototype.cargarEscenas = function (proyectoId, orden) {
        var _this = this;
        if (proyectoId === void 0) { proyectoId = ""; }
        if (orden === void 0) { orden = 1; }
        var peticion = this.angularAPIHelper.buildPeticion({ 'proyecto': this.localStorageService.getPropiedad('proyectoActual') }, { 'orden': '1' });
        this.angularAPIHelper.postEntryOrFilter('escenasPorFiltro', JSON.stringify(peticion))
            .subscribe(function (response) {
            _this.escenas = response.consulta;
            _this.escenas = _this.escenas == undefined ? [] : _this.escenas; // workaround para el componente de listado ordenable
        }, function (error) { return console.error('Error: ' + error); });
    };
    EscenasListComponent.prototype.generarHtmlImagen = function (detalle) {
        var htmlImagen = "";
        if (detalle.imagen != undefined && detalle.mimeType != undefined) {
            htmlImagen = "<img src=\"data:" + detalle.mimeType + ";base64, " + detalle.imagen + "\" style=\"max-height: 20em; width: auto; margin: 0 auto;\" /><br />";
        }
        return htmlImagen;
    };
    EscenasListComponent.prototype.generarHtmlExportacion = function (literario, plantilla) {
        var _this = this;
        this.exportacionWindow = window.open();
        this.exportacionWindow.document.title = "Vista completa del guión - GuionMaker";
        var plantillaEscena = AngularAPIHelper_1.AngularAPIHelper.plantillaEscena;
        if (plantilla != undefined) {
            plantillaEscena = PlantillasModel_1.PlantillaModel.getHtmlEscena(plantilla);
        }
        var _loop_2 = function (escena) {
            var escenaActual = escena;
            var plantillaModificada = plantillaEscena.replace("{{tituloEscena}}", escenaActual.orden + ". " + this_2.getSituacionString(escenaActual) + ". " + escenaActual.titulo.toUpperCase() + ". " + this_2.getTemporalidadString(escenaActual));
            this_2.htmlExportado += "{" + escenaActual.orden + "}";
            this_2.angularAPIHelper.getById(literario ? 'detalleLiterario' : 'detalleTecnico', literario ? escenaActual.detalleLiterario : escenaActual.detalleTecnico).subscribe(function (response) {
                var detalle;
                var respuesta = response;
                if (respuesta.estado == AngularAPIHelper_1.ResponseStatus.OK && respuesta.consulta.length > 0) {
                    if (literario) {
                        detalle = response.consulta[0];
                    }
                    else {
                        detalle = response.consulta[0];
                    }
                    _this.htmlExportado = _this.htmlExportado.replace("{" + escenaActual.orden + "}", plantillaModificada.replace("{{contenidoEscena}}", _this.generarHtmlImagen(detalle) + detalle.texto));
                }
                else {
                    _this.htmlExportado = _this.htmlExportado.replace("{" + escenaActual.orden + "}", "");
                }
                _this.exportacionWindow.document.documentElement.innerHTML = _this.htmlExportado;
            });
        };
        var this_2 = this;
        for (var _i = 0, _a = this.escenas; _i < _a.length; _i++) {
            var escena = _a[_i];
            _loop_2(escena);
        }
    };
    EscenasListComponent.prototype.exportarGuion = function (literario) {
        var _this = this;
        this.htmlExportado = "";
        this.angularAPIHelper.postEntryOrFilter("plantillasPorFiltro", JSON.stringify(this.angularAPIHelper.buildPeticion({ "porDefecto": 1 }, {}))).subscribe(function (response) {
            var plantilla = response.consulta[0];
            var plantillaPortada = AngularAPIHelper_1.AngularAPIHelper.plantillaPortada;
            if (plantilla != undefined) {
                plantillaPortada = PlantillasModel_1.PlantillaModel.getHtmlPortada(plantilla);
            }
            plantillaPortada = plantillaPortada.replace("{{tituloProyecto}}", _this.localStorageService.getPropiedad('nombreProyectoActual'));
            _this.htmlExportado += plantillaPortada.replace("{{tipoGuion}}", literario ? "Guión literario" : "Guión técnico");
            _this.generarHtmlExportacion(literario, plantilla);
        });
    };
    EscenasListComponent.prototype.onDestacar = function (destacar, escena) {
        escena.destacado = destacar;
    };
    EscenasListComponent.prototype.onNuevaEscena = function () {
        var _this = this;
        var escena = new EscenasModel_1.EscenaModel();
        escena.proyecto = this.localStorageService.getPropiedad('proyectoActual');
        escena.orden = this.escenas.length + 1;
        this.angularAPIHelper.postEntryOrFilter('escena', JSON.stringify(escena)).subscribe(function (response) { return _this.escenas.push(response.insertado); }); // por mejorar el asunto del orden
    };
    EscenasListComponent.prototype.onGuardarCambios = function () {
        this.cambiarOrdenEscenas();
        this.guardarCambios();
        this.confirmacionGuardado.setTimeoutRetirarAviso();
    };
    EscenasListComponent.prototype.onAccionGuardado = function (event) {
        if (event == botones_guardado_component_1.TipoOperacionGuardado.Guardar) {
            this.onGuardarCambios();
        }
        else if (event == botones_guardado_component_1.TipoOperacionGuardado.Eliminar) {
            this.onEliminar();
        }
    };
    EscenasListComponent.prototype.getTemporalidadString = function (escena) {
        var _escena = EscenasModel_1.EscenaModel.cargarEscena(escena);
        return _escena.getTemporalidadString();
    };
    EscenasListComponent.prototype.getSituacionString = function (escena) {
        var _escena = EscenasModel_1.EscenaModel.cargarEscena(escena);
        return _escena.getSituacionString();
    };
    EscenasListComponent.prototype.onSeleccionEscenaAEliminar = function (escena) {
        this.escenaAEliminar = escena;
    };
    EscenasListComponent.prototype.onEliminar = function () {
        var _this = this;
        var escena = EscenasModel_1.EscenaModel.cargarEscena(this.escenaAEliminar);
        escena.eliminar(this.angularAPIHelper).subscribe(null, null, function () { return _this.cargarEscenas(); });
    };
    return EscenasListComponent;
}(ModoColaborador_1.ModoColaborador));
EscenasListComponent = __decorate([
    core_1.Component({
        selector: 'lista-escenas',
        templateUrl: './templates/escenas-lista.component.html',
        providers: [AngularAPIHelper_1.AngularAPIHelper, LocalStorageService_1.LocalStorageService]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper_1.AngularAPIHelper, LocalStorageService_1.LocalStorageService])
], EscenasListComponent);
exports.EscenasListComponent = EscenasListComponent;
//# sourceMappingURL=escenas-lista.component.js.map