"use strict";
const mongoose = require("mongoose");
const Personajes_1 = require("../models/Personajes");
const APIHelper_1 = require("./APIHelper");
const ProyectoRoute_1 = require("./ProyectoRoute");
var Route;
(function (Route) {
    class PersonajeRoute {
        static get model() {
            if (PersonajeRoute._model == undefined) {
                PersonajeRoute._model = mongoose.model(Personajes_1.Personaje.name);
            }
            return PersonajeRoute._model;
        }
        getPersonajes(req, res, next) {
            APIHelper_1.APIHelper.getAll(PersonajeRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
        getPersonajeById(req, res, next) {
            APIHelper_1.APIHelper.getById(PersonajeRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
        addPersonaje(req, res, next) {
            APIHelper_1.APIHelper.add(PersonajeRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
        deletePersonaje(req, res, next) {
            APIHelper_1.APIHelper.delete(PersonajeRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
        getPersonajesByFilterAndSort(req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(PersonajeRoute.model, ProyectoRoute_1.ProyectoRoute.alterarFiltroConProyecto(req), res);
        }
    }
    Route.PersonajeRoute = PersonajeRoute;
})(Route || (Route = {}));
module.exports = Route;
