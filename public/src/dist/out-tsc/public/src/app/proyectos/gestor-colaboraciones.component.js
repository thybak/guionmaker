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
import { Component, Input } from "@angular/core";
import { ColaboracionModel, PermisosColaboracion } from "./models/ColaboracionesModel";
import { AngularAPIHelper, ResponseStatus } from "../utils/AngularAPIHelper";
import { UsuarioModel } from "../usuarios/models/UsuarioModel";
export class GestorColaboraciones {
    constructor(angularAPIHelper, proyectoID) {
        this.angularAPIHelper = angularAPIHelper;
        this.proyectoID = proyectoID;
        this.getFromProyectoID(proyectoID);
    }
    getFromProyectoID(proyectoID) {
        let peticion = this.angularAPIHelper.buildPeticion({ "proyecto": proyectoID }, {});
        this.angularAPIHelper.postEntryOrFilter('colaboracionesPorFiltro', JSON.stringify(peticion))
            .subscribe(response => {
            let resultados = response.consulta;
            this.colaboraciones = [];
            for (let idx = 0; idx < resultados.length; idx++) {
                this.colaboraciones.push(ColaboracionModel.cargar(resultados[idx], this.angularAPIHelper));
            }
        });
    }
    prepararAEliminar(colaboracion) {
        this.colaboracionAEliminar = colaboracion;
    }
    cancelarEliminacion() {
        this.colaboracionAEliminar = undefined;
    }
    eliminarColaboracion() {
        if (this.colaboracionAEliminar != undefined) {
            this.angularAPIHelper.deleteById('colaboracion', this.colaboracionAEliminar._id).subscribe(null, null, () => this.getFromProyectoID(this.proyectoID));
        }
    }
    actualizar(colaboracion) {
        let _colaboracion = ColaboracionModel.cargar(colaboracion, this.angularAPIHelper);
        this.angularAPIHelper.postEntryOrFilter('colaboracion', JSON.stringify(_colaboracion)).subscribe(null, null, null);
    }
    nuevoColaborador(usuario) {
        let colaboracion = new ColaboracionModel(usuario._id);
        colaboracion.proyecto = this.proyectoID;
        colaboracion.fecha = new Date();
        colaboracion.permisos = PermisosColaboracion.SoloLectura;
        this.angularAPIHelper.postEntryOrFilter('colaboracion', JSON.stringify(colaboracion)).subscribe(response => {
            let respuesta = response;
            if (respuesta.estado == ResponseStatus.OK) {
                colaboracion = respuesta.insertado;
                colaboracion.email = usuario.email; // atributo sintético
                this.colaboraciones.push(colaboracion);
            }
            else {
                alert('Ha ocurrido un error al guardar la colaboración. Verifica que el usuario no esté en la lista.');
            }
        });
    }
}
let GestorColaboracionesComponent = class GestorColaboracionesComponent {
    constructor() {
        this.tiposPermiso = ColaboracionModel.obtenerTiposPermiso();
    }
    onCrearColaboracion() {
        if (this.email != undefined && this.email != "") {
            this.emailInvalido = false;
            UsuarioModel.getObservableUsuarioByEmail(this.gestorColaboraciones.angularAPIHelper, this.email).subscribe(response => {
                let resultadoUsuariosPorEmail = response.consulta;
                this.usuarioNoEncontrado = !(resultadoUsuariosPorEmail.length >= 1);
                if (!this.usuarioNoEncontrado) {
                    this.gestorColaboraciones.nuevoColaborador(resultadoUsuariosPorEmail[0]);
                }
            });
        }
        else {
            this.emailInvalido = true;
        }
    }
    mostrarNombrePermiso(permiso) {
        let nombrePermiso = "";
        switch (permiso.id) {
            case PermisosColaboracion.SoloLectura:
                nombrePermiso = "Sólo lectura";
                break;
            case PermisosColaboracion.Edicion:
                nombrePermiso = "Edición";
                break;
            default:
                nombrePermiso = permiso.nombre;
        }
        return nombrePermiso;
    }
};
__decorate([
    Input(),
    __metadata("design:type", GestorColaboraciones)
], GestorColaboracionesComponent.prototype, "gestorColaboraciones", void 0);
GestorColaboracionesComponent = __decorate([
    Component({
        selector: "gestor-colaboraciones",
        templateUrl: "./templates/gestor-colaboraciones.component.html",
        providers: [AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [])
], GestorColaboracionesComponent);
export { GestorColaboracionesComponent };
//# sourceMappingURL=gestor-colaboraciones.component.js.map