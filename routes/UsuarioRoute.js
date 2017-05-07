"use strict";
var mongoose = require("mongoose");
var Usuarios_1 = require("../models/Usuarios");
var APIHelper_1 = require("./APIHelper");
var Utils_1 = require("../models/Utils");
var jsonwebtoken = require("jsonwebtoken");
var Route;
(function (Route) {
    var UsuarioRoute = (function () {
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