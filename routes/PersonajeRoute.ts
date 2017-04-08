"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Personaje } from "../models/Personajes";
import { APIHelper } from "./APIHelper";
import { ProyectoRoute } from "./ProyectoRoute";

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
            APIHelper.getAll(PersonajeRoute.model, req, res, ProyectoRoute.crearFiltroProyecto(req));
        }
        public getPersonajeById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(PersonajeRoute.model, req, res, ProyectoRoute.crearFiltroProyecto(req));
        }
        public addPersonaje(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(PersonajeRoute.model, req, res, ProyectoRoute.crearFiltroProyecto(req));
        }
        public deletePersonaje(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(PersonajeRoute.model, req, res, ProyectoRoute.crearFiltroProyecto(req));
        }
        public getPersonajesByFilterAndSort(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getByFilterAndSort(PersonajeRoute.model, ProyectoRoute.alterarFiltroConProyecto(req), res);
        }
    }
}

export = Route;