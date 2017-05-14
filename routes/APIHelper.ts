"use strict";
import * as mongoose from "mongoose";
import * as express from "express";
import { RespuestaLogin } from "../models/Utils";

export enum ResponseStatus {
    OK = 0,
    KO
}

export class RespuestaJson {
    estado: ResponseStatus;
    error: String;
    login: RespuestaLogin;
    consulta: mongoose.Document[];
    insertado: mongoose.Document;
}

export class PeticionJson {
    find: any;
    sort: any;
    select: string;
    populate: any;
    modoColaborador: boolean;

    constructor() {
        this.find = {};
        this.sort = {};
        this.select = "";
        this.populate = {};
        this.modoColaborador = false;
    }
}

export class APIHelper {
    public static buildJsonGeneric(estado: ResponseStatus) {
        let respuesta: RespuestaJson = new RespuestaJson();
        respuesta.estado = estado;
        return respuesta;
    }
    public static buildJsonError(mensaje: String) {
        let respuesta: RespuestaJson = new RespuestaJson();
        respuesta.estado = ResponseStatus.KO;
        respuesta.error = mensaje;
        return respuesta;
    }
    public static buildJsonConsulta(resultado: mongoose.Document[]) {
        let respuesta: RespuestaJson = new RespuestaJson();
        respuesta.estado = ResponseStatus.OK;
        respuesta.consulta = resultado;
        return respuesta;
    }
    public static buildJsonLogin(resultado: RespuestaLogin) {
        let respuesta: RespuestaJson = new RespuestaJson();
        respuesta.estado = ResponseStatus.OK;
        respuesta.login = resultado;
        return respuesta;
    }
    public static buildJsonInsercion(resultado: mongoose.Document) {
        let respuesta: RespuestaJson = new RespuestaJson();
        respuesta.estado = ResponseStatus.OK;
        respuesta.insertado = resultado;
        return respuesta;
    }
    public static comprobarAfterPopulate(resultados: mongoose.Document[], propiedad: string): mongoose.Document[] {
        let _resultados: mongoose.Document[] = [];
        for (let resultado of resultados) {
            if (resultado[propiedad] != null) {
                _resultados.push(resultado);
            }
        }
        return _resultados;
    }
    public static aplanarPropiedadesPopulated(resultados: mongoose.Document[], propiedad: string): mongoose.Document[] {
        let _resultados: mongoose.Document[] = [];
        for (let resultado of resultados) {
            resultado[propiedad] = resultado[propiedad]["_id"];
            _resultados.push(resultado);
        }
        return _resultados;
    }
    public static getAll(model: mongoose.Model<mongoose.Document>, req: express.Request, res: express.Response, filtro: PeticionJson = new PeticionJson()): void {
        let obtenerTodos = function (err, resultado) {
            if (err) {
                res.json(APIHelper.buildJsonError("Error al obtener los registros de la entidad " + model.modelName + ". Más info: " + err));
            } else {
                let _resultados: mongoose.Document[];
                if (Object.keys(filtro.populate).length > 0 && filtro.populate.path != "") {
                    _resultados = APIHelper.comprobarAfterPopulate(resultado, filtro.populate.path);
                } else {
                    _resultados = resultado;
                }
                if (_resultados && _resultados.length > 0) {
                    res.json(APIHelper.buildJsonConsulta(_resultados));
                } else {
                    res.json(APIHelper.buildJsonError("No existen registros de la entidad " + model.modelName + "."));
                }
            }
        };
        if (filtro == undefined || filtro.populate == undefined || filtro.populate.path == "") {
            model.find({}).exec(obtenerTodos);
        } else {
            let find = Object.keys(filtro.find).length > 0 ? filtro.find : "";
            let populate = Object.keys(filtro.populate).length > 0 ? filtro.populate : "";
            model.find(find).populate(populate).exec(obtenerTodos);
        }
    }
    public static getById(model: mongoose.Model<mongoose.Document>, req: express.Request, res: express.Response, filtro: PeticionJson = new PeticionJson()): void {
        let id = req.params.id;
        if (id != undefined) {
            filtro.find["_id"] = id;
            let obtenerPorId = function (err, resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Error al obtener los registros de la entidad " + model.modelName + ". Más info: " + err));
                } else {
                    let _resultado: mongoose.Document[];
                    if (Object.keys(filtro.populate).length > 0 && filtro.populate.path != "") {
                        _resultado = APIHelper.comprobarAfterPopulate(resultado, filtro.populate.path);
                        _resultado = APIHelper.aplanarPropiedadesPopulated(_resultado, filtro.populate.path);
                    } else {
                        _resultado = resultado;
                    }
                    if (_resultado != undefined) {
                        res.json(APIHelper.buildJsonConsulta(_resultado));
                    } else {
                        res.json(APIHelper.buildJsonError("No existen registros de la entidad " + model.modelName + " con ID " + id + "."));
                    }
                }
            };
            if (Object.keys(filtro.populate).length == 0) {
                model.find(filtro.find).select(filtro.select).exec(obtenerPorId);
            } else {
                model.find(filtro.find).populate(filtro.populate).select(filtro.select).exec(obtenerPorId);
            }
        } else {
            res.json(APIHelper.buildJsonError("No se ha aportado ninguna ID de la entidad " + model.modelName + "."));
        }
    }
    public static add(model: mongoose.Model<mongoose.Document>, req: express.Request, res: express.Response, filtro: PeticionJson = new PeticionJson()): void {
        if (req.body != undefined) {
            if (req.body._id == undefined) {
                let nuevoRegistro = new model(req.body);
                nuevoRegistro.save(function (err, _resultado) {
                    if (err) {
                        res.json(APIHelper.buildJsonError("Error al intentar insertar un nuevo registro en la entidad " + model.modelName + ". Más info: " + err));
                    } else {
                        res.json(APIHelper.buildJsonInsercion(_resultado));
                    }
                });
            } else {
                filtro.find._id = req.body._id;
                this.update(model, req, res, filtro);
            }
        } else {
            res.json(APIHelper.buildJsonError("No se ha transferido ningún objeto a guardar para la entidad " + model.modelName + "."));
        }
    }
    public static update(model: mongoose.Model<mongoose.Document>, req: express.Request, res: express.Response, filtro: PeticionJson = new PeticionJson()): void {
        if (req.body != undefined) {
            model.find(filtro.find).populate(Object.keys(filtro.populate).length > 0 ? filtro.populate : "").exec(function (err, resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Error al intentar actualizar un registro en la entidad " + model.modelName + ". Más info: " + err + ". Modelo: " + req.body));
                } else {
                    let _resultado: mongoose.Document[];
                    if (Object.keys(filtro.populate).length > 0 && filtro.populate.path != "") {
                        _resultado = APIHelper.comprobarAfterPopulate(resultado, filtro.populate.path);
                        _resultado = APIHelper.aplanarPropiedadesPopulated(_resultado, filtro.populate.path);
                    } else {
                        _resultado = resultado;
                    }
                    if (_resultado != undefined && _resultado.length > 0) {
                        if (filtro.find._id == undefined) {
                            filtro.find._id = req.body._id;
                        }
                        model.findOneAndUpdate(filtro.find, req.body, { new: true },  function (err, resp) {
                            if (err) {
                                res.json(APIHelper.buildJsonError("Error al intentar actualizar un registro en la entidad " + model.modelName + ". Más info: " + err + ". Modelo: " + req.body));
                            } else {
                                res.json(APIHelper.buildJsonGeneric(ResponseStatus.OK));
                            }
                        });
                    } else {
                        res.json(APIHelper.buildJsonError("Error al intentar actualizar un registro en la entidad " + model.modelName + ". Más info: " + err + ". Modelo: " + req.body));
                    }
                }
            });

        } else {
            res.json(APIHelper.buildJsonError("No se puede actualizar ningún registro sin body en la petición para la entidad " + model.modelName + "."));
        }
    }
    public static delete(model: mongoose.Model<mongoose.Document>, req: express.Request, res: express.Response, filtro: PeticionJson = new PeticionJson()): void {
        let id = req.params.id;
        if (id != undefined) {
            filtro.find["_id"] = id;
            let borrar = function (err, resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Ha habido un error al eliminar el registro " + id + ". Más info: " + err));
                } else if (Object.keys(resultado).length == 0) {
                    res.json(APIHelper.buildJsonError("Ha habido un error al eliminar el registro " + id + ". No se ha encontrado en la colección"));
                } else {
                    let _resultado: any;
                    if (Object.keys(filtro.populate).length > 0 && filtro.populate.path != "") {
                        _resultado = resultado[0][filtro.populate.path] != null ? resultado[0] : undefined;
                        if (_resultado != undefined) {
                            _resultado[filtro.populate.path] = _resultado[filtro.populate.path]["_id"];
                        }
                    } else {
                        _resultado = resultado[0];
                    }
                    if (_resultado != undefined) {
                        model.remove(_resultado).exec((err) => {
                            if (err) {
                                res.json(APIHelper.buildJsonError("Ha habido un error al eliminar el registro " + _resultado + ". Más info: " + err));
                            } else {
                                _resultado.remove();
                                res.json(APIHelper.buildJsonGeneric(ResponseStatus.OK));
                            }
                        });
                    }
                }
            };
            let find = Object.keys(filtro.find).length > 0 ? filtro.find : "";
            if (Object.keys(filtro.populate).length == 0) {
                model.find(find).exec(borrar);
            } else {
                model.find(find).populate(filtro.populate).exec(borrar);
            }
        } else {
            res.json(APIHelper.buildJsonError("No se ha aportado ninguna ID de la entidad " + model.modelName + "."));
        }
    }
    public static getByFilterAndSort(model: mongoose.Model<mongoose.Document>, req: express.Request, res: express.Response): void {
        let reqBody: string = JSON.stringify(req.body);
        let objReqBody = JSON.parse(reqBody) as PeticionJson;
        let sort = objReqBody.sort == undefined ? { "_id": "1" } : objReqBody.sort; // por omisión se ordena por _id
        let find = objReqBody.find == undefined ? { "_id": "1" } : objReqBody.find; // por omisión se busca el _id = 1 forzando error
        
        let obtenerPorFiltroYOrden = function (err, resultado) {
            if (err) {
                APIHelper.buildJsonError("Ha habido un error a la hora de obtener registros por el filtro " + reqBody + ". Más info: " + err);
            } else {
                let _res: mongoose.Document[];
                if (objReqBody.populate != undefined && Object.keys(objReqBody.populate).length > 0 && objReqBody.populate.path != "") {
                    _res = APIHelper.comprobarAfterPopulate(resultado, objReqBody.populate.path);
                    _res = APIHelper.aplanarPropiedadesPopulated(_res, objReqBody.populate.path);
                } else {
                    _res = resultado;
                }
                res.json(APIHelper.buildJsonConsulta(_res));
            }
        };
        if (objReqBody.populate == undefined || Object.keys(objReqBody.populate).length == 0) {
            model.find(find).sort(sort).select(objReqBody.select).exec(obtenerPorFiltroYOrden);
        } else {
            model.find(find).populate(objReqBody.populate).sort(sort).select(objReqBody.select).exec(obtenerPorFiltroYOrden);
        }
    }
}