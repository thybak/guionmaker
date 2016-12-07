"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Escena } from "../models/Escenas";
import { APIHelper } from "./APIHelper";

module Route {
    export class EscenaRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (EscenaRoute._model == undefined) {
                EscenaRoute._model = mongoose.model(Escena.name);
            }
            return EscenaRoute._model;
        }

        public getEscenas(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(EscenaRoute.model, res);
        }
        public getEscenasByFilter(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getByFilter(EscenaRoute.model, JSON.stringify(req.body), res);
        }
        public getEscenaById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(EscenaRoute.model, req.params.id, res);
        }
        public addEscena(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(EscenaRoute.model, req, res);
        }
        public deleteEscena(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(EscenaRoute.model, req.params.id, res);
        }
    }
}

export = Route;