"use strict";
var mongoose = require("mongoose");
var Colaboraciones_1 = require("../models/Colaboraciones");
var APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    var ColaboracionRoute = (function () {
        function ColaboracionRoute() {
        }
        Object.defineProperty(ColaboracionRoute, "model", {
            get: function () {
                if (ColaboracionRoute._model == undefined) {
                    ColaboracionRoute._model = mongoose.model(Colaboraciones_1.Colaboracion.name);
                }
                return ColaboracionRoute._model;
            },
            enumerable: true,
            configurable: true
        });
        ColaboracionRoute.prototype.getColaboraciones = function (req, res, next) {
            APIHelper_1.APIHelper.getAll(ColaboracionRoute.model, req, res);
        };
        ColaboracionRoute.prototype.addColaboracion = function (req, res, next) {
            APIHelper_1.APIHelper.add(ColaboracionRoute.model, req, res);
        };
        ColaboracionRoute.prototype.getColaboracionById = function (req, res, next) {
            APIHelper_1.APIHelper.getById(ColaboracionRoute.model, req, res);
        };
        ColaboracionRoute.prototype.deleteColaboracion = function (req, res, next) {
            APIHelper_1.APIHelper.delete(ColaboracionRoute.model, req, res);
        };
        ColaboracionRoute.prototype.getColaboracionesByFilterAndSort = function (req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(ColaboracionRoute.model, req, res);
        };
        return ColaboracionRoute;
    }());
    Route.ColaboracionRoute = ColaboracionRoute;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=ColaboracionRoute.js.map