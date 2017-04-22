"use strict";
var mongoose = require("mongoose");
var Proyectos_1 = require("../models/Proyectos");
var APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    var ProyectoRoute = (function () {
        function ProyectoRoute() {
        }
        Object.defineProperty(ProyectoRoute, "model", {
            get: function () {
                if (ProyectoRoute._model == undefined) {
                    ProyectoRoute._model = mongoose.model(Proyectos_1.Proyecto.name);
                }
                return ProyectoRoute._model;
            },
            enumerable: true,
            configurable: true
        });
        ProyectoRoute.crearFiltroAutor = function (req) {
            var filtro = new APIHelper_1.PeticionJson();
            filtro.find = { "autor": req.user.usuarioLogeado };
            return filtro;
        };
        ProyectoRoute.crearFiltroProyecto = function (req) {
            var filtro = new APIHelper_1.PeticionJson();
            filtro.populate = "proyecto";
            filtro.populateFind = { "autor": req.user.usuarioLogeado };
            return filtro;
        };
        ProyectoRoute.alterarFiltroConProyecto = function (req) {
            var filtro = ProyectoRoute.crearFiltroProyecto(req);
            req.body.populate = filtro.populate;
            req.body.populateFind = filtro.populateFind;
            return req;
        };
        ProyectoRoute.prototype.getProyectos = function (req, res, next) {
            APIHelper_1.APIHelper.getAll(ProyectoRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        };
        ProyectoRoute.prototype.getProyectosByFilterAndSort = function (req, res, next) {
            if (req.body.find != undefined) {
                req.body.find.autor = req.user.usuarioLogeado;
            }
            else {
                req.body.find = { "autor": req.user.usuarioLogeado };
            }
            APIHelper_1.APIHelper.getByFilterAndSort(ProyectoRoute.model, req, res);
        };
        ProyectoRoute.prototype.getProyectoById = function (req, res, next) {
            APIHelper_1.APIHelper.getById(ProyectoRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        };
        ProyectoRoute.prototype.addProyecto = function (req, res, next) {
            APIHelper_1.APIHelper.add(ProyectoRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        };
        ProyectoRoute.prototype.deleteProyecto = function (req, res, next) {
            APIHelper_1.APIHelper.delete(ProyectoRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        };
        return ProyectoRoute;
    }());
    Route.ProyectoRoute = ProyectoRoute;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=ProyectoRoute.js.map