"use strict";

import { Component, Input } from "@angular/core";
import { ProyectoModel } from "./models/ProyectosModel";
import { ColaboracionModel, PermisosColaboracion } from "./models/ColaboracionesModel";
import { AngularAPIHelper, RespuestaJson, ResponseStatus } from "../utils/AngularAPIHelper";
import { UsuarioModel } from "../usuarios/models/UsuarioModel";

export class GestorColaboraciones {
    proyecto: ProyectoModel;
    colaboracionAEliminar: ColaboracionModel;
    angularAPIHelper: AngularAPIHelper;

    constructor(angularAPIHelper: AngularAPIHelper, proyecto: ProyectoModel) {
        this.angularAPIHelper = angularAPIHelper;
        this.proyecto = proyecto;
        for (let idx = 0; idx < this.proyecto.colaboradores.length; idx++) {
            this.proyecto.colaboradores[idx] = ColaboracionModel.cargar(this.proyecto.colaboradores[idx], this.angularAPIHelper);
        }
    }

    public prepararAEliminar(colaborador: ColaboracionModel) {
        this.colaboracionAEliminar = colaborador;
    }

    public cancelarEliminacion() {
        this.colaboracionAEliminar = undefined;
    }

    public obtenerIndiceColaborador(colaborador: ColaboracionModel) {
        let fIdx = -1;
        for (let idx = 0; idx < this.proyecto.colaboradores.length; idx++) {
            if (this.proyecto.colaboradores[idx].usuario == colaborador.usuario) {
                fIdx = idx;
                break;
            }
        }
        return fIdx;
    }

    public eliminarColaboracion() {
        if (this.colaboracionAEliminar != undefined) {
            this.proyecto.colaboradores.splice(this.obtenerIndiceColaborador(this.colaboracionAEliminar), 1);
        }
    }

    public nuevoColaborador(usuario: UsuarioModel) {
        let colaboracion: ColaboracionModel = new ColaboracionModel(usuario._id);
        let idxColaborador = this.obtenerIndiceColaborador(colaboracion);
        if (idxColaborador < 0) {
            colaboracion.fecha = new Date();
            colaboracion.permisos = PermisosColaboracion.SoloLectura;
            colaboracion.email = usuario.email; // atributo sintético
            this.proyecto.colaboradores.push(colaboracion);
        } else {
            alert("Asegúrate de que no has introducido ese usuario antes");
        }
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
    tiposPermiso: any[];

    constructor() {
        this.tiposPermiso = ColaboracionModel.obtenerTiposPermiso();
    }

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

    mostrarNombrePermiso(permiso: any): string{
        let nombrePermiso: string = "";
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
}
