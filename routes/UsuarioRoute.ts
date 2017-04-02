"use strict";
import * as mongoose from "mongoose";
import * as express from "express";
import { Usuario } from "../models/Usuarios";
import { APIHelper } from "./APIHelper";
import { Utils, RespuestaLogin } from "../models/Utils";
import * as jsonwebtoken from "jsonwebtoken";

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
        public getUsuariosByFilterAndSort(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getByFilterAndSort(UsuarioRoute.model, JSON.stringify(req.body), res);
        }
        public login(req: express.Request, res: express.Response, next: express.NextFunction) {
            if (req.body != undefined) {
                console.log(req.body);
                UsuarioRoute.model.find({ 'nombreUsuario': req.body.nombreUsuario, 'pass': req.body.pass }).exec(function (err, _res) {
                    if (err) {
                        res.json(APIHelper.buildJsonError("Ha habido un error iniciando sesión para el usuario: " + req.body.nombreUsuario));
                    } else {
                        if (_res.length == 1) {
                            let respuestaLogin = new RespuestaLogin(jsonwebtoken.sign(req.body, "g423gj8f_GfsldGLPxcz"), _res[0]._id);
                            res.json(APIHelper.buildJsonLogin(respuestaLogin));
                        } else {
                            res.json(APIHelper.buildJsonError("No se ha podido iniciar sesión con el usuario " + req.body.nombreUsuario));
                        }
                    }
                });
            }
        }
    }
}

export = Route;