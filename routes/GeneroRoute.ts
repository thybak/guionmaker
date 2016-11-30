"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Genero } from "../models/Generos";
import { APIHelper } from "./APIHelper";

module Route {
    export class GeneroRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (GeneroRoute._model == undefined) {
                GeneroRoute._model = mongoose.model(Genero.name);
            }
            return GeneroRoute._model;
        }

        public getGeneros(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(GeneroRoute.model, res);
        }
        public addGenero(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(GeneroRoute.model, req, res);
        }
        public getGeneroById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(GeneroRoute.model, req.params.id, res);
        }
        public deleteGenero(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(GeneroRoute.model, req.params.id, res);
        }
    }
}

export = Route;