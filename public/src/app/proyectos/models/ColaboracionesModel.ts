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
    nombreUsuario: string; // sintético

    constructor(usuarioId: string = "582e0dbffb1e5a33184cdf39") {
        this.usuario = usuarioId;
    }

    public static cargar(colaboracion: any, angularAPIHelper: AngularAPIHelper): ColaboracionModel {
        let _colaboracion: ColaboracionModel = new ColaboracionModel(colaboracion.usuario);
        _colaboracion.proyecto = colaboracion.proyecto;
        _colaboracion.fecha = colaboracion.fecha;
        _colaboracion.permisos = colaboracion.permisos;
        _colaboracion._id = colaboracion._id;
        _colaboracion.setNombreUsuario(angularAPIHelper);
        return _colaboracion;
    }

    private setNombreUsuario(angularAPIHelper: AngularAPIHelper) {
        UsuarioModel.getObservableUsuarioById(angularAPIHelper, this.usuario).subscribe(
            response => {
                let respuesta = response as RespuestaJson;
                if (respuesta.estado == ResponseStatus.OK) {
                    let resultadoUsuarios = respuesta.consulta as UsuarioModel[];
                    if (resultadoUsuarios.length >= 1) {
                        this.nombreUsuario = resultadoUsuarios[0].nombreUsuario;
                    }
                }
            });
    }
}