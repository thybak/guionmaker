"use strict";
var mongoose = require("mongoose");
var Personajes_1 = require("../models/Personajes");
var APIHelper_1 = require("./APIHelper");
var ProyectoRoute_1 = require("./ProyectoRoute");
var Route;
(function (Route) {
    var PersonajeRoute = /** @class */ (function () {
        function PersonajeRoute() {
        }
        Object.defineProperty(PersonajeRoute, "model", {
            get: function () {
                if (PersonajeRoute._model == undefined) {
                    PersonajeRoute._model = mongoose.model(Personajes_1.Personaje.name);
                }
                return PersonajeRoute._model;
            },
            enumerable: true,
            configurable: true
        });
        PersonajeRoute.prototype.getPersonajes = function (req, res, next) {
            APIHelper_1.APIHelper.getAll(PersonajeRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        };
        PersonajeRoute.prototype.getPersonajeById = function (req, res, next) {
            APIHelper_1.APIHelper.getById(PersonajeRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        };
        PersonajeRoute.prototype.addPersonaje = function (req, res, next) {
            APIHelper_1.APIHelper.add(PersonajeRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyectoManipulacion(req));
        };
        PersonajeRoute.prototype.deletePersonaje = function (req, res, next) {
            APIHelper_1.APIHelper.delete(PersonajeRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyectoManipulacion(req));
        };
        PersonajeRoute.prototype.getPersonajesByFilterAndSort = function (req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(PersonajeRoute.model, ProyectoRoute_1.ProyectoRoute.alterarFiltroConProyecto(req), res);
        };
        return PersonajeRoute;
    }());
    Route.PersonajeRoute = PersonajeRoute;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=PersonajeRoute.js.map