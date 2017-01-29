"use strict";
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["OK"] = 0] = "OK";
    ResponseStatus[ResponseStatus["KO"] = 1] = "KO";
})(ResponseStatus || (ResponseStatus = {}));
class RespuestaJson {
}
class PeticionJson {
}
class APIHelper {
    static buildJsonGeneric(estado) {
        let respuesta = new RespuestaJson();
        respuesta.estado = estado;
        return respuesta;
    }
    static buildJsonError(mensaje) {
        let respuesta = new RespuestaJson();
        respuesta.estado = ResponseStatus.KO;
        respuesta.error = mensaje;
        return respuesta;
    }
    static buildJsonConsulta(resultado) {
        let respuesta = new RespuestaJson();
        respuesta.estado = ResponseStatus.OK;
        respuesta.consulta = resultado;
        return respuesta;
    }
    static buildJsonInsercion(resultado) {
        let respuesta = new RespuestaJson();
        respuesta.estado = ResponseStatus.OK;
        respuesta.insertado = resultado;
        return respuesta;
    }
    static getAll(model, res) {
        model.find().exec(function (err, _resultados) {
            if (err) {
                res.json(APIHelper.buildJsonError("Error al obtener los registros de la entidad " + model.modelName + ". Más info: " + err));
            }
            else {
                if (_resultados && _resultados.length > 0) {
                    res.json(APIHelper.buildJsonConsulta(_resultados));
                }
                else {
                    res.json(APIHelper.buildJsonError("No existen registros de la entidad " + model.modelName + "."));
                }
            }
        });
    }
    static getById(model, id, res) {
        if (id != undefined) {
            model.findById(id).exec(function (err, _resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Error al obtener los registros de la entidad " + model.modelName + ". Más info: " + err));
                }
                else {
                    if (_resultado != undefined) {
                        res.json(APIHelper.buildJsonConsulta(new Array(_resultado)));
                    }
                    else {
                        res.json(APIHelper.buildJsonError("No existen registros de la entidad " + model.modelName + " con ID " + id + "."));
                    }
                }
            });
        }
        else {
            res.json(APIHelper.buildJsonError("No se ha aportado ninguna ID de la entidad " + model.modelName + "."));
        }
    }
    static add(model, req, res) {
        if (req.body != undefined) {
            if (req.body._id == undefined) {
                let nuevoRegistro = new model(req.body);
                nuevoRegistro.save(function (err, _resultado) {
                    if (err) {
                        res.json(APIHelper.buildJsonError("Error al intentar insertar un nuevo registro en la entidad " + model.modelName + ". Más info: " + err));
                    }
                    else {
                        res.json(APIHelper.buildJsonInsercion(_resultado));
                    }
                });
            }
            else {
                this.update(model, req, res);
            }
        }
        else {
            res.json(APIHelper.buildJsonError("No se ha transferido ningún objeto a guardar para la entidad " + model.modelName + "."));
        }
    }
    static update(model, req, res) {
        if (req.body != undefined) {
            model.update({ "_id": req.body._id }, req.body, function (err, _resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Error al intentar actualizar un registro en la entidad " + model.modelName + ". Más info: " + err + ". Modelo: " + req.body));
                }
                else {
                    res.json(APIHelper.buildJsonGeneric(ResponseStatus.OK));
                }
            });
        }
        else {
            res.json(APIHelper.buildJsonError("No se puede actualizar ningún registro sin body en la petición para la entidad " + model.modelName + "."));
        }
    }
    static delete(model, id, res) {
        if (id != undefined) {
            model.findById(id).exec(function (err, _resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Ha habido un error al eliminar el registro " + id + ". Más info: " + err));
                }
                else {
                    if (_resultado != undefined) {
                        model.remove(_resultado).exec((err) => {
                            if (err) {
                                res.json(APIHelper.buildJsonError("Ha habido un error al eliminar el registro " + _resultado + ". Más info: " + err));
                            }
                            else {
                                _resultado.remove();
                                res.json(APIHelper.buildJsonGeneric(ResponseStatus.OK));
                            }
                        });
                    }
                }
            });
        }
        else {
            res.json(APIHelper.buildJsonError("No se ha aportado ninguna ID de la entidad " + model.modelName + "."));
        }
    }
    static getByFilterAndSort(model, reqBody, res) {
        let objReqBody = JSON.parse(reqBody);
        let sort = objReqBody.sort == undefined ? { "_id": "1" } : objReqBody.sort; // por omisión se ordena por _id
        let find = objReqBody.find == undefined ? { "_id": "1" } : objReqBody.find; // por omisión se busca el _id = 1 forzando error
        model.find(find).sort(sort).exec(function (err, _res) {
            if (err) {
                APIHelper.buildJsonError("Ha habido un error a la hora de obtener registros por el filtro " + reqBody + ". Más info: " + err);
            }
            else {
                res.json(APIHelper.buildJsonConsulta(_res));
            }
        });
    }
}
exports.APIHelper = APIHelper;
