﻿"use strict"

import * as mongoose from "mongoose";
import * as express from "express";

enum ResponseStatus {
    OK = 0,
    KO
}

class RespuestaJson {
    estado: ResponseStatus;
    error: String;
    consulta: mongoose.Document[];
    insertado: mongoose.Document;
}

export class APIHelper {
    private static buildJsonGeneric(estado: ResponseStatus) {
        let respuesta: RespuestaJson = new RespuestaJson();
        respuesta.estado = estado;
        return respuesta;
    }
    private static buildJsonError(mensaje: String) {
        let respuesta: RespuestaJson = new RespuestaJson();
        respuesta.estado = ResponseStatus.KO;
        respuesta.error = mensaje;
        return respuesta;
    }
    private static buildJsonConsulta(resultado: mongoose.Document[]) {
        let respuesta: RespuestaJson = new RespuestaJson();
        respuesta.estado = ResponseStatus.OK;
        respuesta.consulta = resultado;
        return respuesta;
    }
    private static buildJsonInsercion(resultado: mongoose.Document) {
        let respuesta: RespuestaJson = new RespuestaJson();
        respuesta.estado = ResponseStatus.OK;
        respuesta.insertado = resultado;
        return respuesta;
    }
    public static getAll(model: mongoose.Model<mongoose.Document>, res: express.Response): void {
        model.find().exec(function (err, _resultados) {
            if (err) {
                res.json(APIHelper.buildJsonError("Error al obtener los registros de la entidad " + model.modelName + ". Más info: " + err));
            } else {
                if (_resultados && _resultados.length > 0) {
                    res.json(APIHelper.buildJsonConsulta(_resultados));
                } else {
                    res.json(APIHelper.buildJsonError("No existen registros de la entidad " + model.modelName + "."));
                }
            }
        });
    }
    public static getById(model: mongoose.Model<mongoose.Document>, id: mongoose.Schema.Types.ObjectId, res: express.Response) : void {
        if (id != undefined) {
            model.findById(id).exec(function (err, _resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Error al obtener los registros de la entidad " + model.modelName + ". Más info: " + err));
                } else {
                    if (_resultado != undefined) {
                        res.json(APIHelper.buildJsonConsulta(new Array<mongoose.Document>(_resultado)));
                    } else {
                        res.json(APIHelper.buildJsonError("No existen registros de la entidad " + model.modelName + " con ID " + id + "."));
                    }
                }
            });
        } else {
            res.json(APIHelper.buildJsonError("No se ha aportado ninguna ID de la entidad " + model.modelName + "."));
        }
    }
    public static add(model: mongoose.Model<mongoose.Document>, req: express.Request, res: express.Response) : void {
        if (req.body != undefined) {
            var nuevoRegistro = new model(req.body);
            nuevoRegistro.save(function (err, _resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Error al intentar insertar un nuevo registro en la entidad " + model.modelName + ". Más info: " + err));
                } else {
                    res.json(APIHelper.buildJsonInsercion(_resultado));
                }
            });
        } else {
            res.json(APIHelper.buildJsonError("No se ha transferido ningún objeto a guardar para la entidad " + model.modelName + "."));
        }
    }
    public static delete(model: mongoose.Model<mongoose.Document>, id: mongoose.Schema.Types.ObjectId, res: express.Response) : void {
        if (id != undefined) {
            model.findById(id).exec(function (err, _resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Ha habido un error al eliminar el registro " + id + ". Más info: " + err));
                } else {
                    model.remove(_resultado).exec(function (err, _resultado) {
                        if (err) {
                            res.json(APIHelper.buildJsonError("Ha habido un error al eliminar el registro " + _resultado + ". Más info: " + err));
                        } else {
                            res.json(APIHelper.buildJsonGeneric(ResponseStatus.OK));
                        }
                    });
                }
            });
        } else {
            res.json(APIHelper.buildJsonError("No se ha aportado ninguna ID de la entidad " + model.modelName + "."));
        }
    }
    public static getByFilter(model: mongoose.Model<mongoose.Document>, filter: string, res: express.Response): void {
        model.find(JSON.parse(filter)).exec(function (err, _res) {
            if (err) {
                APIHelper.buildJsonError("Ha habido un error a la hora de obtener registros por el filtro " + filter + ". Más info: " + err);
            } else {
                res.json(APIHelper.buildJsonConsulta(_res));
            }
        });
    } 
}