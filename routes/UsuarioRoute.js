"use strict";
const mongoose = require("mongoose");
const Usuarios_1 = require("../models/Usuarios");
const APIHelper_1 = require("./APIHelper");
const Utils_1 = require("../models/Utils");
const jsonwebtoken = require("jsonwebtoken");
var Route;
(function (Route) {
    class UsuarioRoute {
        static get model() {
            if (UsuarioRoute._model == undefined) {
                UsuarioRoute._model = mongoose.model(Usuarios_1.Usuario.name);
            }
            return UsuarioRoute._model;
        }
        getUsuarios(req, res, next) {
            APIHelper_1.APIHelper.getAll(UsuarioRoute.model, res);
        }
        addUsuario(req, res, next) {
            APIHelper_1.APIHelper.add(UsuarioRoute.model, req, res);
        }
        getUsuarioById(req, res, next) {
            APIHelper_1.APIHelper.getById(UsuarioRoute.model, req.params.id, res);
        }
        deleteUsuario(req, res, next) {
            APIHelper_1.APIHelper.delete(UsuarioRoute.model, req.params.id, res);
        }
        getUsuariosByFilterAndSort(req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(UsuarioRoute.model, JSON.stringify(req.body), res);
        }
        login(req, res, next) {
            if (req.body != undefined) {
                console.log(req.body);
                UsuarioRoute.model.find({ 'nombreUsuario': req.body.nombreUsuario, 'pass': req.body.pass }).exec(function (err, _res) {
                    if (err) {
                        res.json(APIHelper_1.APIHelper.buildJsonError("Ha habido un error iniciando sesión para el usuario: " + req.body.nombreUsuario));
                    }
                    else {
                        if (_res.length == 1) {
                            let respuestaLogin = new Utils_1.RespuestaLogin(jsonwebtoken.sign(req.body, "g423gj8f_GfsldGLPxcz"), _res[0]._id);
                            res.json(APIHelper_1.APIHelper.buildJsonLogin(respuestaLogin));
                        }
                        else {
                            res.json(APIHelper_1.APIHelper.buildJsonError("No se ha podido iniciar sesión con el usuario " + req.body.nombreUsuario));
                        }
                    }
                });
            }
        }
    }
    Route.UsuarioRoute = UsuarioRoute;
})(Route || (Route = {}));
module.exports = Route;
