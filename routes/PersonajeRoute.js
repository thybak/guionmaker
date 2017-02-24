"use strict";
const mongoose = require("mongoose");
const Personajes_1 = require("../models/Personajes");
const APIHelper_1 = require("./APIHelper");
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
            APIHelper_1.APIHelper.getAll(PersonajeRoute.model, res);
        }
        getPersonajeById(req, res, next) {
            APIHelper_1.APIHelper.getById(PersonajeRoute.model, req.params.id, res);
        }
        addPersonaje(req, res, next) {
            APIHelper_1.APIHelper.add(PersonajeRoute.model, req, res);
        }
        deletePersonaje(req, res, next) {
            APIHelper_1.APIHelper.delete(PersonajeRoute.model, req.params.id, res);
        }
        getPersonajesByFilterAndSort(req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(PersonajeRoute.model, JSON.stringify(req.body), res);
        }
    }
    Route.PersonajeRoute = PersonajeRoute;
})(Route || (Route = {}));
module.exports = Route;
