"use strict";
var mongoose = require("mongoose");
var Generos_1 = require("../models/Generos");
var APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    var GeneroRoute = /** @class */ (function () {
        function GeneroRoute() {
        }
        Object.defineProperty(GeneroRoute, "model", {
            get: function () {
                if (GeneroRoute._model == undefined) {
                    GeneroRoute._model = mongoose.model(Generos_1.Genero.name);
                }
                return GeneroRoute._model;
            },
            enumerable: true,
            configurable: true
        });
        GeneroRoute.prototype.getGeneros = function (req, res, next) {
            APIHelper_1.APIHelper.getAll(GeneroRoute.model, req, res);
        };
        GeneroRoute.prototype.addGenero = function (req, res, next) {
            APIHelper_1.APIHelper.add(GeneroRoute.model, req, res);
        };
        GeneroRoute.prototype.getGeneroById = function (req, res, next) {
            APIHelper_1.APIHelper.getById(GeneroRoute.model, req, res);
        };
        GeneroRoute.prototype.deleteGenero = function (req, res, next) {
            APIHelper_1.APIHelper.delete(GeneroRoute.model, req, res);
        };
        return GeneroRoute;
    }());
    Route.GeneroRoute = GeneroRoute;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=GeneroRoute.js.map