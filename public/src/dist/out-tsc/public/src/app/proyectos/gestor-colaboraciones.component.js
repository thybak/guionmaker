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
    function GestorColaboraciones(angularAPIHelper, proyecto) {
        this.angularAPIHelper = angularAPIHelper;
        this.proyecto = proyecto;
        for (var idx = 0; idx < this.proyecto.colaboradores.length; idx++) {
            this.proyecto.colaboradores[idx] = ColaboracionesModel_1.ColaboracionModel.cargar(this.proyecto.colaboradores[idx], this.angularAPIHelper);
        }
    }
    GestorColaboraciones.prototype.prepararAEliminar = function (colaborador) {
        this.colaboracionAEliminar = colaborador;
    };
    GestorColaboraciones.prototype.cancelarEliminacion = function () {
        this.colaboracionAEliminar = undefined;
    };
    GestorColaboraciones.prototype.obtenerIndiceColaborador = function (colaborador) {
        var fIdx = -1;
        for (var idx = 0; idx < this.proyecto.colaboradores.length; idx++) {
            if (this.proyecto.colaboradores[idx].usuario == colaborador.usuario) {
                fIdx = idx;
                break;
            }
        }
        return fIdx;
    };
    GestorColaboraciones.prototype.eliminarColaboracion = function () {
        if (this.colaboracionAEliminar != undefined) {
            this.proyecto.colaboradores.splice(this.obtenerIndiceColaborador(this.colaboracionAEliminar), 1);
        }
    };
    GestorColaboraciones.prototype.nuevoColaborador = function (usuario) {
        var colaboracion = new ColaboracionesModel_1.ColaboracionModel(usuario._id);
        var idxColaborador = this.obtenerIndiceColaborador(colaboracion);
        if (idxColaborador < 0) {
            colaboracion.fecha = new Date();
            colaboracion.permisos = ColaboracionesModel_1.PermisosColaboracion.SoloLectura;
            colaboracion.email = usuario.email; // atributo sintético
            this.proyecto.colaboradores.push(colaboracion);
        }
        else {
            alert("Asegúrate de que no has introducido ese usuario antes");
        }
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