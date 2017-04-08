"use strict";
const mongoose = require("mongoose");
const Proyectos_1 = require("../models/Proyectos");
const APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    class ProyectoRoute {
        static get model() {
            if (ProyectoRoute._model == undefined) {
                ProyectoRoute._model = mongoose.model(Proyectos_1.Proyecto.name);
            }
            return ProyectoRoute._model;
        }
        static crearFiltroAutor(req) {
            let filtro = new APIHelper_1.PeticionJson();
            filtro.find = { "autor": req.user.usuarioLogeado };
            return filtro;
        }
        static crearFiltroProyecto(req) {
            let filtro = new APIHelper_1.PeticionJson();
            filtro.populate = "proyecto";
            filtro.populateFind = { "autor": req.user.usuarioLogeado };
            return filtro;
        }
        static alterarFiltroConProyecto(req) {
            let filtro = ProyectoRoute.crearFiltroProyecto(req);
            req.body.populate = filtro.populate;
            req.body.populateFind = filtro.populateFind;
            return req;
        }
        getProyectos(req, res, next) {
            APIHelper_1.APIHelper.getAll(ProyectoRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        }
        getProyectosByFilterAndSort(req, res, next) {
            if (req.body.find != undefined) {
                req.body.find.autor = req.user.usuarioLogeado;
            }
            else {
                req.body.find = { "autor": req.user.usuarioLogeado };
            }
            APIHelper_1.APIHelper.getByFilterAndSort(ProyectoRoute.model, req, res);
        }
        getProyectoById(req, res, next) {
            APIHelper_1.APIHelper.getById(ProyectoRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        }
        addProyecto(req, res, next) {
            APIHelper_1.APIHelper.add(ProyectoRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        }
        deleteProyecto(req, res, next) {
            APIHelper_1.APIHelper.delete(ProyectoRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        }
    }
    Route.ProyectoRoute = ProyectoRoute;
})(Route || (Route = {}));
module.exports = Route;
