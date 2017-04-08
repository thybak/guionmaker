"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Clasificacion } from "../models/Clasificaciones";
import { APIHelper } from "./APIHelper";

module Route {
    export class ClasificacionRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (ClasificacionRoute._model == undefined) {
                ClasificacionRoute._model = mongoose.model(Clasificacion.name);
            }
            return ClasificacionRoute._model;
        }

        public getClasificaciones(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(ClasificacionRoute.model, req, res);
        }
        public addClasificacion(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(ClasificacionRoute.model, req, res);
        }
        public getClasificacionById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(ClasificacionRoute.model, req, res);
        }
        public deleteClasificacion(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(ClasificacionRoute.model, req, res);
        }
    }
}

export = Route;