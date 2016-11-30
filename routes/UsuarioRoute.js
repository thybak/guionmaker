"use strict";
const mongoose = require("mongoose");
const Usuarios_1 = require("../models/Usuarios");
const APIHelper_1 = require("./APIHelper");
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
    }
    Route.UsuarioRoute = UsuarioRoute;
})(Route || (Route = {}));
module.exports = Route;
