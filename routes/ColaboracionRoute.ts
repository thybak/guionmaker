"use strict";
import * as mongoose from "mongoose";
import * as express from "express";
import { Colaboracion } from "../models/Colaboraciones";
import { APIHelper } from "./APIHelper";

module Route {
    export class ColaboracionRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (ColaboracionRoute._model == undefined) {
                ColaboracionRoute._model = mongoose.model(Colaboracion.name);
            }
            return ColaboracionRoute._model;
        }

        public getColaboraciones(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(ColaboracionRoute.model, req, res);
        }
        public addColaboracion(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(ColaboracionRoute.model, req, res);
        }
        public getColaboracionById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(ColaboracionRoute.model, req, res);
        }
        public deleteColaboracion(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(ColaboracionRoute.model, req, res);
        }
        public getColaboracionesByFilterAndSort(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getByFilterAndSort(ColaboracionRoute.model, req, res);
        }
    }
}

export = Route;