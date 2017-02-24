"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Personaje } from "../models/Personajes";
import { APIHelper } from "./APIHelper";

module Route {
    export class PersonajeRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (PersonajeRoute._model == undefined) {
                PersonajeRoute._model = mongoose.model(Personaje.name);
            }
            return PersonajeRoute._model;
        }

        public getPersonajes(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(PersonajeRoute.model, res);
        }
        public getPersonajeById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(PersonajeRoute.model, req.params.id, res);
        }
        public addPersonaje(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(PersonajeRoute.model, req, res);
        }
        public deletePersonaje(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(PersonajeRoute.model, req.params.id, res);
        }
        public getPersonajesByFilterAndSort(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getByFilterAndSort(PersonajeRoute.model, JSON.stringify(req.body), res);
        }
    }
}

export = Route;