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
var ColaboracionesModel_1 = require("./models/ColaboracionesModel");
var AngularAPIHelper_1 = require("../utils/AngularAPIHelper");
var UsuarioModel_1 = require("../usuarios/models/UsuarioModel");
var GestorColaboraciones = (function () {
    function GestorColaboraciones(angularAPIHelper, proyectoID) {
        this.angularAPIHelper = angularAPIHelper;
        this.proyectoID = proyectoID;
        this.getFromProyectoID(proyectoID);
    }
    GestorColaboraciones.prototype.getFromProyectoID = function (proyectoID) {
        var _this = this;
        var peticion = this.angularAPIHelper.buildPeticion({ "proyecto": proyectoID }, {});
        this.angularAPIHelper.postEntryOrFilter('colaboracionesPorFiltro', JSON.stringify(peticion))
            .subscribe(function (response) {
            var resultados = response.consulta;
            _this.colaboraciones = [];
            for (var idx = 0; idx < resultados.length; idx++) {
                _this.colaboraciones.push(ColaboracionesModel_1.ColaboracionModel.cargar(resultados[idx], _this.angularAPIHelper));
            }
        });
    };
    GestorColaboraciones.prototype.prepararAEliminar = function (colaboracion) {
        this.colaboracionAEliminar = colaboracion;
    };
    GestorColaboraciones.prototype.cancelarEliminacion = function () {
        this.colaboracionAEliminar = undefined;
    };
    GestorColaboraciones.prototype.eliminarColaboracion = function () {
        var _this = this;
        if (this.colaboracionAEliminar != undefined) {
            this.angularAPIHelper.deleteById('colaboracion', this.colaboracionAEliminar._id).subscribe(null, null, function () { return _this.getFromProyectoID(_this.proyectoID); });
        }
    };
    GestorColaboraciones.prototype.actualizar = function (colaboracion) {
        var _colaboracion = ColaboracionesModel_1.ColaboracionModel.cargar(colaboracion, this.angularAPIHelper);
        this.angularAPIHelper.postEntryOrFilter('colaboracion', JSON.stringify(_colaboracion)).subscribe(null, null, null);
    };
    GestorColaboraciones.prototype.nuevoColaborador = function (usuario) {
        var _this = this;
        var colaboracion = new ColaboracionesModel_1.ColaboracionModel(usuario._id);
        colaboracion.proyecto = this.proyectoID;
        colaboracion.fecha = new Date();
        colaboracion.permisos = ColaboracionesModel_1.PermisosColaboracion.SoloLectura;
        this.angularAPIHelper.postEntryOrFilter('colaboracion', JSON.stringify(colaboracion)).subscribe(function (response) {
            var respuesta = response;
            if (respuesta.estado == AngularAPIHelper_1.ResponseStatus.OK) {
                colaboracion = respuesta.insertado;
                colaboracion.email = usuario.email; // atributo sintético
                _this.colaboraciones.push(colaboracion);
            }
            else {
                alert('Ha ocurrido un error al guardar la colaboración. Verifica que el usuario no esté en la lista.');
            }
        });
    };
    return GestorColaboraciones;
}());
exports.GestorColaboraciones = GestorColaboraciones;
var GestorColaboracionesComponent = (function () {
    function GestorColaboracionesComponent() {
        this.tiposPermiso = ColaboracionesModel_1.ColaboracionModel.obtenerTiposPermiso();
    }
    GestorColaboracionesComponent.prototype.onCrearColaboracion = function () {
        var _this = this;
        if (this.email != undefined && this.email != "") {
            this.emailInvalido = false;
            UsuarioModel_1.UsuarioModel.getObservableUsuarioByEmail(this.gestorColaboraciones.angularAPIHelper, this.email).subscribe(function (response) {
                var resultadoUsuariosPorEmail = response.consulta;
                _this.usuarioNoEncontrado = !(resultadoUsuariosPorEmail.length >= 1);
                if (!_this.usuarioNoEncontrado) {
                    _this.gestorColaboraciones.nuevoColaborador(resultadoUsuariosPorEmail[0]);
                }
            });
        }
        else {
            this.emailInvalido = true;
        }
    };
    GestorColaboracionesComponent.prototype.mostrarNombrePermiso = function (permiso) {
        var nombrePermiso = "";
        switch (permiso.id) {
            case ColaboracionesModel_1.PermisosColaboracion.SoloLectura:
                nombrePermiso = "Sólo lectura";
                break;
            case ColaboracionesModel_1.PermisosColaboracion.Edicion:
                nombrePermiso = "Edición";
                break;
            default:
                nombrePermiso = permiso.nombre;
        }
        return nombrePermiso;
    };
    return GestorColaboracionesComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", GestorColaboraciones)
], GestorColaboracionesComponent.prototype, "gestorColaboraciones", void 0);
GestorColaboracionesComponent = __decorate([
    core_1.Component({
        selector: "gestor-colaboraciones",
        templateUrl: "./templates/gestor-colaboraciones.component.html",
        providers: [AngularAPIHelper_1.AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [])
], GestorColaboracionesComponent);
exports.GestorColaboracionesComponent = GestorColaboracionesComponent;
//# sourceMappingURL=gestor-colaboraciones.component.js.map