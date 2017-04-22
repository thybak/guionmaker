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
var EscenasModel_1 = require("./models/EscenasModel");
var DetallesLiterariosModel_1 = require("./models/DetallesLiterariosModel");
var DetallesTecnicosModel_1 = require("./models/DetallesTecnicosModel");
var AngularAPIHelper_1 = require("../utils/AngularAPIHelper");
var LocalStorageService_1 = require("../utils/LocalStorageService");
var confirmacion_guardado_component_1 = require("../utils/confirmacion-guardado.component");
var botones_guardado_component_1 = require("../utils/botones-guardado.component");
var gestor_subida_component_1 = require("../utils/gestor-subida.component");
var jQuery = require("jquery");
var DetalleEscenaComponent = (function () {
    function DetalleEscenaComponent(angularAPIHelper, el, router, route, localStorageService, differs) {
        var _this = this;
        this.angularAPIHelper = angularAPIHelper;
        this.el = el;
        this.router = router;
        this.route = route;
        this.localStorageService = localStorageService;
        this.differs = differs;
        this.botonesGuardado = new botones_guardado_component_1.BotonesGuardado();
        this.botonesGuardado.mostrarCompleto();
        this.confirmacionGuardado = new confirmacion_guardado_component_1.ConfirmacionGuardado();
        this.fichero = new gestor_subida_component_1.Fichero();
        this.activarSugerencias = this.localStorageService.getPropiedad('activarSugerencias') == 'true';
        this.differ = this.differs.find({}).create(null);
        this.route.params.switchMap(function (params) { return _this.angularAPIHelper.getById('escena', params['id']); }).
            subscribe(function (response) {
            _this.cargarModelo(response);
            var peticion = _this.angularAPIHelper.buildPeticion({ proyecto: _this.escena.proyecto }, {}, "nombre proyecto");
            _this.ng2sconfig = {
                addclass: {
                    debug: false
                },
                hint: {
                    elementosBiblia: [],
                    activarSugerencias: _this.activarSugerencias,
                    match: /\b(\w{1,})$/,
                    search: function (keyword, callback) {
                        var _this = this;
                        callback(jQuery.grep(this.elementosBiblia, function (item) {
                            if (!_this.activarSugerencias) {
                                return false;
                            }
                            return item.toLowerCase().indexOf(keyword.toLowerCase()) === 0;
                        }));
                    }
                },
                minHeight: 200,
                lang: 'es-ES',
                placeholder: 'Escribe tu texto...',
                toolbar: [
                    ['style', ['addclass', 'fontname', 'clear']],
                    ['fontstyle', ['bold', 'italic', 'paragraph']],
                    ['fontstyleextra', ['strikethrough', 'underline', 'hr', 'color', 'superscript', 'subscript']],
                    ['extra', ['table', 'height']],
                    ['misc', ['undo', 'redo', 'codeview']]
                ],
                fontNames: ['Courier New', 'Arial', 'Arial Black', 'Sans-serif', 'Serif']
            };
            _this.ng2sconfig.hint.activarSugerencias = _this.activarSugerencias;
            _this.angularAPIHelper.postEntryOrFilter('personajesPorFiltro', JSON.stringify(peticion)).subscribe(function (response) {
                var nombrePersonajes = response.consulta;
                if (nombrePersonajes != undefined) {
                    _this.rellenarAutocompletar(nombrePersonajes);
                }
            });
            _this.angularAPIHelper.postEntryOrFilter('escenariosPorFiltro', JSON.stringify(peticion)).subscribe(function (response) {
                var nombreEscenarios = response.consulta;
                if (nombreEscenarios != undefined) {
                    _this.rellenarAutocompletar(nombreEscenarios);
                }
            });
        }, function (error) { return console.log('Error:' + error); });
    }
    DetalleEscenaComponent.prototype.cargarModelo = function (response) {
        var _this = this;
        this.escena = response.consulta[0];
        if (this.escena != undefined) {
            if (this.escena.detalleLiterario != undefined) {
                this.angularAPIHelper.getById('detalleLiterario', this.escena.detalleLiterario)
                    .subscribe(function (response) {
                    _this.detalleLiterario = response.consulta[0];
                    _this.detalleLiterario.texto = _this.detalleLiterario.texto == "" ? new String('') : _this.detalleLiterario.texto; // workaround por culpa del componente ng2-summernote donde con "" no se muestra nada.
                }, function (error) { return console.log('Error:' + error); });
            }
            else {
                this.detalleLiterario = new DetallesLiterariosModel_1.DetalleLiterarioModel();
            }
            if (this.escena.detalleTecnico != undefined) {
                this.angularAPIHelper.getById('detalleTecnico', this.escena.detalleTecnico)
                    .subscribe(function (response) {
                    _this.detalleTecnico = response.consulta[0];
                    _this.detalleTecnico.texto = _this.detalleTecnico.texto == "" ? new String('') : _this.detalleTecnico.texto;
                    _this.fichero.base64 = _this.detalleTecnico.imagen;
                    _this.fichero.mimeType = _this.detalleTecnico.mimeType;
                }, function (error) { return console.log('Error: ' + error); });
            }
            else {
                this.detalleTecnico = new DetallesTecnicosModel_1.DetalleTecnicoModel();
            }
        }
    };
    DetalleEscenaComponent.prototype.guardarEscena = function (response) {
        var _this = this;
        var resultadoDetalleTecnico = response.insertado;
        if (resultadoDetalleTecnico != undefined) {
            this.escena.detalleTecnico = resultadoDetalleTecnico._id;
            this.detalleTecnico = resultadoDetalleTecnico;
        }
        this.angularAPIHelper.postEntryOrFilter('escena', JSON.stringify(this.escena)).subscribe(null, function (error) { return _this.confirmacionGuardado.setEstadoGuardado(false); }, function () { _this.confirmacionGuardado.setEstadoGuardado(true); _this.botonesGuardado.mostrarCompleto(); });
    };
    DetalleEscenaComponent.prototype.guardarDetalles = function (response) {
        var _this = this;
        var resultadoDetalleLiterario = response.insertado;
        if (resultadoDetalleLiterario != undefined) {
            this.escena.detalleLiterario = resultadoDetalleLiterario._id;
            this.detalleLiterario = resultadoDetalleLiterario;
        }
        this.angularAPIHelper.postEntryOrFilter('detalleTecnico', JSON.stringify(this.detalleTecnico))
            .subscribe(function (response) { return _this.guardarEscena(response); }, function (error) { return _this.confirmacionGuardado.setEstadoGuardado(false); });
    };
    DetalleEscenaComponent.prototype.guardarCambios = function () {
        var _this = this;
        this.angularAPIHelper.postEntryOrFilter('detalleLiterario', JSON.stringify(this.detalleLiterario))
            .subscribe(function (response) { return _this.guardarDetalles(response); }, function (error) { return _this.confirmacionGuardado.setEstadoGuardado(false); });
    };
    DetalleEscenaComponent.prototype.rellenarAutocompletar = function (elementos) {
        for (var _i = 0, elementos_1 = elementos; _i < elementos_1.length; _i++) {
            var elemento = elementos_1[_i];
            this.ng2sconfig.hint.elementosBiblia.push(elemento.nombre);
        }
    };
    DetalleEscenaComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.escena);
        if (changes != undefined && changes._changesTail != undefined) {
            this.botonesGuardado.mostrarCompleto(false);
        }
    };
    DetalleEscenaComponent.prototype.toggleSugerencias = function () {
        this.ng2sconfig.hint.activarSugerencias = this.activarSugerencias;
        this.localStorageService.setPropiedad('activarSugerencias', this.activarSugerencias.valueOf().toString());
    };
    DetalleEscenaComponent.prototype.onAccionGuardado = function (event) {
        var _this = this;
        if (event == botones_guardado_component_1.TipoOperacionGuardado.Guardar) {
            this.detalleTecnico.imagen = this.fichero.base64;
            this.detalleTecnico.mimeType = this.fichero.mimeType;
            this.guardarCambios();
            this.confirmacionGuardado.setTimeoutRetirarAviso();
        }
        else if (event == botones_guardado_component_1.TipoOperacionGuardado.Volver) {
            this.router.navigate(['/escenas']);
        }
        else if (event == botones_guardado_component_1.TipoOperacionGuardado.Eliminar) {
            var escena = EscenasModel_1.EscenaModel.cargarEscena(this.escena);
            escena.eliminar(this.angularAPIHelper).subscribe(null, null, function () { return _this.router.navigate(['/escenas']); });
        }
    };
    return DetalleEscenaComponent;
}());
DetalleEscenaComponent = __decorate([
    core_1.Component({
        templateUrl: './templates/escena-detalle.component.html',
        providers: [AngularAPIHelper_1.AngularAPIHelper, LocalStorageService_1.LocalStorageService],
        selector: 'detalle-escena'
    }),
    __metadata("design:paramtypes", [AngularAPIHelper_1.AngularAPIHelper, core_1.ElementRef, router_1.Router, router_1.ActivatedRoute, LocalStorageService_1.LocalStorageService, core_1.KeyValueDiffers])
], DetalleEscenaComponent);
exports.DetalleEscenaComponent = DetalleEscenaComponent;
//# sourceMappingURL=escena-detalle.component.js.map