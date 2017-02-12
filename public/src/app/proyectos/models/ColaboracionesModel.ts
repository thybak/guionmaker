"use strict";

import { UsuarioModel } from '../../usuarios/models/UsuarioModel';
import { AngularAPIHelper, RespuestaJson, ResponseStatus } from '../../utils/AngularAPIHelper';

export enum PermisosColaboracion {
    SoloLectura,
    Edicion
}
export class ColaboracionModel {
    _id: string;
    usuario: string; //id
    proyecto: string;
    fecha: Date;
    permisos: number;
    email: string; // sintético

    constructor(usuarioId: string = "582e0dbffb1e5a33184cdf39") {
        this.usuario = usuarioId;
    }

    private setEmail(angularAPIHelper: AngularAPIHelper) {
        UsuarioModel.getObservableUsuarioById(angularAPIHelper, this.usuario).subscribe(
            response => {
                let respuesta = response as RespuestaJson;
                if (respuesta.estado == ResponseStatus.OK) {
                    let resultadoUsuarios = respuesta.consulta as UsuarioModel[];
                    if (resultadoUsuarios.length >= 1) {
                        this.email = resultadoUsuarios[0].email;
                    }
                }
            });
    }

    public static cargar(colaboracion: any, angularAPIHelper: AngularAPIHelper): ColaboracionModel {
        let _colaboracion: ColaboracionModel = new ColaboracionModel(colaboracion.usuario);
        _colaboracion.proyecto = colaboracion.proyecto;
        _colaboracion.fecha = colaboracion.fecha;
        _colaboracion.permisos = colaboracion.permisos;
        _colaboracion._id = colaboracion._id;
        _colaboracion.setEmail(angularAPIHelper);
        return _colaboracion;
    }

    public static obtenerTiposPermiso() {  
        let permisos = [];
        let idx = 0; // se asume que la enumeración no va a alterar los enteros que se le asignan por orden
        for (let permiso in PermisosColaboracion) {
            if (isNaN(parseInt(permiso, 10))) {
                permisos.push({ "nombre": permiso, "id": idx });
                idx++;
            }
        }
        return permisos;
    }
}