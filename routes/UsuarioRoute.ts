"use strict";
import * as mongoose from "mongoose";
import * as express from "express";
import { Usuario } from "../models/Usuarios";
import { APIHelper } from "./APIHelper";

module Route {
    export class UsuarioRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (UsuarioRoute._model == undefined) {
                UsuarioRoute._model = mongoose.model(Usuario.name);
            }
            return UsuarioRoute._model;
        }

        public getUsuarios(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(UsuarioRoute.model, res);
        }
        public addUsuario(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(UsuarioRoute.model, req, res);
        }
        public getUsuarioById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(UsuarioRoute.model, req.params.id, res);
        }
        public deleteUsuario(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(UsuarioRoute.model, req.params.id, res);
        }
    }
}

export = Route;