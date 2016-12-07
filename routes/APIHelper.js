"use strict";
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["OK"] = 0] = "OK";
    ResponseStatus[ResponseStatus["KO"] = 1] = "KO";
})(ResponseStatus || (ResponseStatus = {}));
class RespuestaJson {
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
            var nuevoRegistro = new model(req.body);
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
            res.json(APIHelper.buildJsonError("No se ha transferido ningún objeto a guardar para la entidad " + model.modelName + "."));
        }
    }
    static delete(model, id, res) {
        if (id != undefined) {
            model.findById(id).exec(function (err, _resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Ha habido un error al eliminar el registro " + id + ". Más info: " + err));
                }
                else {
                    model.remove(_resultado).exec(function (err, _resultado) {
                        if (err) {
                            res.json(APIHelper.buildJsonError("Ha habido un error al eliminar el registro " + _resultado + ". Más info: " + err));
                        }
                        else {
                            res.json(APIHelper.buildJsonGeneric(ResponseStatus.OK));
                        }
                    });
                }
            });
        }
        else {
            res.json(APIHelper.buildJsonError("No se ha aportado ninguna ID de la entidad " + model.modelName + "."));
        }
    }
    static getByFilter(model, filter, res) {
        model.find(JSON.parse(filter)).exec(function (err, _res) {
            if (err) {
                APIHelper.buildJsonError("Ha habido un error a la hora de obtener registros por el filtro " + filter + ". Más info: " + err);
            }
            else {
                res.json(APIHelper.buildJsonConsulta(_res));
            }
        });
    }
}
exports.APIHelper = APIHelper;
