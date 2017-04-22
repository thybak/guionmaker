"use strict";
import { UsuarioModel } from '../../usuarios/models/UsuarioModel';
import { ResponseStatus } from '../../utils/AngularAPIHelper';
export var PermisosColaboracion;
(function (PermisosColaboracion) {
    PermisosColaboracion[PermisosColaboracion["SoloLectura"] = 0] = "SoloLectura";
    PermisosColaboracion[PermisosColaboracion["Edicion"] = 1] = "Edicion";
})(PermisosColaboracion || (PermisosColaboracion = {}));
export class ColaboracionModel {
    constructor(usuarioId = "582e0dbffb1e5a33184cdf39") {
        this.usuario = usuarioId;
    }
    setEmail(angularAPIHelper) {
        UsuarioModel.getObservableUsuarioById(angularAPIHelper, this.usuario).subscribe(response => {
            let respuesta = response;
            if (respuesta.estado == ResponseStatus.OK) {
                let resultadoUsuarios = respuesta.consulta;
                if (resultadoUsuarios.length >= 1) {
                    this.email = resultadoUsuarios[0].email;
                }
            }
        });
    }
    static cargar(colaboracion, angularAPIHelper) {
        let _colaboracion = new ColaboracionModel(colaboracion.usuario);
        _colaboracion.proyecto = colaboracion.proyecto;
        _colaboracion.fecha = colaboracion.fecha;
        _colaboracion.permisos = colaboracion.permisos;
        _colaboracion._id = colaboracion._id;
        _colaboracion.setEmail(angularAPIHelper);
        return _colaboracion;
    }
    static obtenerTiposPermiso() {
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
//# sourceMappingURL=ColaboracionesModel.js.map