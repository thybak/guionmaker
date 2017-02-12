"use strict";

import { Component, Input } from "@angular/core";
import { ColaboracionModel, PermisosColaboracion } from "./models/ColaboracionesModel";
import { AngularAPIHelper, RespuestaJson, ResponseStatus } from "../utils/AngularAPIHelper";
import { UsuarioModel } from "../usuarios/models/UsuarioModel";

export class GestorColaboraciones {
    colaboraciones: ColaboracionModel[];
    proyectoID: string;
    colaboracionAEliminar: ColaboracionModel;
    angularAPIHelper: AngularAPIHelper;

    constructor(angularAPIHelper: AngularAPIHelper, proyectoID: string) {
        this.angularAPIHelper = angularAPIHelper;
        this.proyectoID = proyectoID;
        this.getFromProyectoID(proyectoID);
    }

    public getFromProyectoID(proyectoID: string) {
        let peticion = this.angularAPIHelper.buildPeticion({ "proyecto": proyectoID }, {});
        this.angularAPIHelper.postEntryOrFilter('colaboracionesPorFiltro', JSON.stringify(peticion))
            .subscribe(response => {
                let resultados = (response as RespuestaJson).consulta;
                this.colaboraciones = [];
                for (let idx = 0; idx < resultados.length; idx++) {
                    this.colaboraciones.push(ColaboracionModel.cargar(resultados[idx], this.angularAPIHelper));
                }
            });
    }

    public prepararAEliminar(colaboracion: ColaboracionModel) {
        this.colaboracionAEliminar = colaboracion;
    }

    public cancelarEliminacion() {
        this.colaboracionAEliminar = undefined;
    }

    public eliminarColaboracion() {
        if (this.colaboracionAEliminar != undefined) {
            this.angularAPIHelper.deleteById('colaboracion', this.colaboracionAEliminar._id).subscribe(null, null,
                () => this.getFromProyectoID(this.proyectoID));
        }
    }

    public nuevoColaborador(usuario: UsuarioModel) {
        let colaboracion: ColaboracionModel = new ColaboracionModel(usuario._id);
        colaboracion.proyecto = this.proyectoID;
        colaboracion.fecha = new Date();
        colaboracion.permisos = PermisosColaboracion.SoloLectura;
        this.angularAPIHelper.postEntryOrFilter('colaboracion', JSON.stringify(colaboracion)).subscribe(
            response => {
                let respuesta: RespuestaJson = response as RespuestaJson;
                if (respuesta.estado == ResponseStatus.OK) {
                    colaboracion = respuesta.insertado as ColaboracionModel;
                    colaboracion.nombreUsuario = usuario.nombreUsuario; // atributo sintético
                    this.colaboraciones.push(colaboracion);
                } else {
                    alert('Ha ocurrido un error al guardar la colaboración. Verifica que el usuario no esté en la lista.');
                }
            });
    }
}

@Component({
    selector: "gestor-colaboraciones",
    templateUrl: "./templates/gestor-colaboraciones.component.html",
    providers: [AngularAPIHelper]
})
export class GestorColaboracionesComponent {
    @Input()
    gestorColaboraciones: GestorColaboraciones;
    email: string;
    usuarioNoEncontrado: boolean;
    emailInvalido: boolean;

    onCrearColaboracion() {
        if (this.email != undefined && this.email != "") {
            this.emailInvalido = false;
            UsuarioModel.getObservableUsuarioByEmail(this.gestorColaboraciones.angularAPIHelper, this.email).subscribe(
                response => {
                    let resultadoUsuariosPorEmail: UsuarioModel[] = (response as RespuestaJson).consulta as UsuarioModel[];
                    this.usuarioNoEncontrado = !(resultadoUsuariosPorEmail.length >= 1);
                    if (!this.usuarioNoEncontrado) {
                        this.gestorColaboraciones.nuevoColaborador(resultadoUsuariosPorEmail[0]);
                    }
                });
        } else {
            this.emailInvalido = true;
        }
    }
}
