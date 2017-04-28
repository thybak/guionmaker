"use strict";
var UsuarioModel_1 = require("../../usuarios/models/UsuarioModel");
var AngularAPIHelper_1 = require("../../utils/AngularAPIHelper");
var PermisosColaboracion;
(function (PermisosColaboracion) {
    PermisosColaboracion[PermisosColaboracion["SoloLectura"] = 0] = "SoloLectura";
    PermisosColaboracion[PermisosColaboracion["Edicion"] = 1] = "Edicion";
})(PermisosColaboracion = exports.PermisosColaboracion || (exports.PermisosColaboracion = {}));
var ColaboracionModel = (function () {
    function ColaboracionModel(usuarioId) {
        this.usuario = usuarioId;
    }
    ColaboracionModel.prototype.setEmail = function (angularAPIHelper) {
        var _this = this;
        UsuarioModel_1.UsuarioModel.getObservableUsuarioById(angularAPIHelper, this.usuario).subscribe(function (response) {
            var respuesta = response;
            if (respuesta.estado == AngularAPIHelper_1.ResponseStatus.OK) {
                var resultadoUsuarios = respuesta.consulta;
                if (resultadoUsuarios.length >= 1) {
                    _this.email = resultadoUsuarios[0].email;
                }
            }
        });
    };
    ColaboracionModel.cargar = function (colaboracion, angularAPIHelper) {
        var _colaboracion = new ColaboracionModel(colaboracion.usuario);
        _colaboracion.fecha = colaboracion.fecha;
        _colaboracion.permisos = colaboracion.permisos;
        _colaboracion._id = colaboracion._id;
        _colaboracion.setEmail(angularAPIHelper);
        return _colaboracion;
    };
    ColaboracionModel.obtenerTiposPermiso = function () {
        var permisos = [];
        var idx = 0; // se asume que la enumeración no va a alterar los enteros que se le asignan por orden
        for (var permiso in PermisosColaboracion) {
            if (isNaN(parseInt(permiso, 10))) {
                permisos.push({ "nombre": permiso, "id": idx });
                idx++;
            }
        }
        return permisos;
    };
    return ColaboracionModel;
}());
exports.ColaboracionModel = ColaboracionModel;
//# sourceMappingURL=ColaboracionesModel.js.map