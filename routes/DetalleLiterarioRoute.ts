"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { DetalleLiterario } from "../models/DetallesLiterarios";
import { APIHelper } from "./APIHelper";

module Route {
    export class DetalleLiterarioRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (DetalleLiterarioRoute._model == undefined) {
                DetalleLiterarioRoute._model = mongoose.model(DetalleLiterario.name);
            }
            return DetalleLiterarioRoute._model;
        }

        public getDetallesLiterarios(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(DetalleLiterarioRoute.model, req, res);
        }
        public addDetalleLiterario(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(DetalleLiterarioRoute.model, req, res);
        }
        public getDetalleLiterarioById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(DetalleLiterarioRoute.model, req, res);
        }
        public deleteDetalleLiterario(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(DetalleLiterarioRoute.model, req, res);
        }
    }
}

export = Route;