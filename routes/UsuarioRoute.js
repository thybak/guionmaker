"use strict";
var mongoose = require("mongoose");
var Usuarios_1 = require("../models/Usuarios");
var APIHelper_1 = require("./APIHelper");
var Utils_1 = require("../models/Utils");
var jsonwebtoken = require("jsonwebtoken");
var Route;
(function (Route) {
    var UsuarioRoute = /** @class */ (function () {
        function UsuarioRoute() {
        }
        Object.defineProperty(UsuarioRoute, "model", {
            get: function () {
                if (UsuarioRoute._model == undefined) {
                    UsuarioRoute._model = mongoose.model(Usuarios_1.Usuario.name);
                }
                return UsuarioRoute._model;
            },
            enumerable: true,
            configurable: true
        });
        UsuarioRoute.crearFiltroSeleccion = function () {
            var filtro = new APIHelper_1.PeticionJson();
            filtro.select = "_id nombreUsuario email";
            return filtro;
        };
        UsuarioRoute.alterarFiltro = function (req) {
            req.body.select = "_id nombreUsuario email";
            return req;
        };
        UsuarioRoute.prototype.getUsuarios = function (req, res, next) {
            APIHelper_1.APIHelper.getAll(UsuarioRoute.model, req, res);
        };
        UsuarioRoute.prototype.addUsuario = function (req, res, next) {
            APIHelper_1.APIHelper.add(UsuarioRoute.model, req, res);
        };
        UsuarioRoute.prototype.getUsuarioById = function (req, res, next) {
            APIHelper_1.APIHelper.getById(UsuarioRoute.model, req, res, UsuarioRoute.crearFiltroSeleccion());
        };
        UsuarioRoute.prototype.deleteUsuario = function (req, res, next) {
            APIHelper_1.APIHelper.delete(UsuarioRoute.model, req, res);
        };
        UsuarioRoute.prototype.getUsuariosByFilterAndSort = function (req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(UsuarioRoute.model, UsuarioRoute.alterarFiltro(req), res);
        };
        UsuarioRoute.prototype.generarTokenRecuperacion = function (req, res, next) {
            var identificadorUsuario = req.params.identificadorUsuario;
            if (identificadorUsuario !== undefined) {
                UsuarioRoute.model.find({ $or: [{ 'nombreUsuario': identificadorUsuario }, { 'email': identificadorUsuario }] }).exec(function (err, _res) {
                    if (err) {
                        res.json(APIHelper_1.APIHelper.buildJsonError("Ha habido un error recuperando la contraseña del usuario: " + identificadorUsuario));
                    }
                    else {
                        if (_res && _res.length == 1) {
                            var usuario = _res[0];
                            var fechaCreacionToken = new Date();
                            usuario.tokenRecuperacion = Utils_1.Utils.firmarTexto(usuario.nombreUsuario + fechaCreacionToken);
                            usuario.fechaTokenRecuperacion = fechaCreacionToken;
                            req.body = usuario;
                            APIHelper_1.APIHelper.update(UsuarioRoute.model, req, res);
                        }
                        else {
                            res.json(APIHelper_1.APIHelper.buildJsonError("No se puede recuperar la contraseña de este usuario."));
                        }
                    }
                });
            }
        };
        UsuarioRoute.prototype.verificarTokenRecuperacion = function (req, res, next) {
            var identificadorUsuario = req.params.identificadorUsuario;
            var tokenRecuperacion = req.params.tokenRecuperacion;
            if (identificadorUsuario !== undefined && tokenRecuperacion !== undefined) {
                UsuarioRoute.model.find({
                    $and: [
                        { $or: [{ 'nombreUsuario': identificadorUsuario }, { 'email': identificadorUsuario }] },
                        { 'tokenRecuperacion': tokenRecuperacion }
                    ]
                }).exec(function (err, _res) {
                    if (_res && _res.length == 1) {
                        var usuario = _res[0];
                        if (Utils_1.Utils.diferenciaDiasEntre(usuario.fechaTokenRecuperacion, new Date()) > 1.0) {
                            res.json(APIHelper_1.APIHelper.buildJsonError("El token de recuperación ha caducado"));
                        }
                        else {
                            res.json(APIHelper_1.APIHelper.buildJsonConsulta(_res));
                        }
                    }
                    else {
                        res.json(APIHelper_1.APIHelper.buildJsonError("No se ha podido verificar que este token pertenezca al usuario facilitado"));
                    }
                });
            }
        };
        UsuarioRoute.prototype.login = function (req, res, next) {
            if (req.body != undefined) {
                UsuarioRoute.model.find({ 'nombreUsuario': req.body.nombreUsuario, 'pass': req.body.pass }).exec(function (err, _res) {
                    if (err) {
                        res.json(APIHelper_1.APIHelper.buildJsonError("Ha habido un error iniciando sesión para el usuario: " + req.body.nombreUsuario));
                    }
                    else {
                        if (_res.length == 1) {
                            req.body.usuarioLogeado = _res[0]._id;
                            var respuestaLogin = new Utils_1.RespuestaLogin(jsonwebtoken.sign(req.body, "g423gj8f_GfsldGLPxcz"), _res[0]._id, req.body.nombreUsuario);
                            res.json(APIHelper_1.APIHelper.buildJsonLogin(respuestaLogin));
                        }
                        else {
                            res.json(APIHelper_1.APIHelper.buildJsonError("No se ha podido iniciar sesión con el usuario " + req.body.nombreUsuario));
                        }
                    }
                });
            }
        };
        return UsuarioRoute;
    }());
    Route.UsuarioRoute = UsuarioRoute;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=UsuarioRoute.js.map