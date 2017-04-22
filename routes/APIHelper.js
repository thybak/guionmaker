"use strict";
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["OK"] = 0] = "OK";
    ResponseStatus[ResponseStatus["KO"] = 1] = "KO";
})(ResponseStatus || (ResponseStatus = {}));
class RespuestaJson {
}
class PeticionJson {
    constructor() {
        this.find = {};
        this.sort = {};
        this.select = "";
        this.populate = "";
        this.populateFind = {};
    }
}
exports.PeticionJson = PeticionJson;
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
    static buildJsonLogin(resultado) {
        let respuesta = new RespuestaJson();
        respuesta.estado = ResponseStatus.OK;
        respuesta.login = resultado;
        return respuesta;
    }
    static buildJsonInsercion(resultado) {
        let respuesta = new RespuestaJson();
        respuesta.estado = ResponseStatus.OK;
        respuesta.insertado = resultado;
        return respuesta;
    }
    static comprobarAfterPopulate(resultados, propiedad) {
        let _resultados = [];
        for (let resultado of resultados) {
            if (resultado[propiedad] != null) {
                _resultados.push(resultado);
            }
        }
        return _resultados;
    }
    static aplanarPropiedadesPopulated(resultados, propiedad) {
        let _resultados = [];
        for (let resultado of resultados) {
            resultado[propiedad] = resultado[propiedad]["_id"];
            _resultados.push(resultado);
        }
        return _resultados;
    }
    static getAll(model, req, res, filtro = undefined) {
        let obtenerTodos = function (err, resultado) {
            if (err) {
                res.json(APIHelper.buildJsonError("Error al obtener los registros de la entidad " + model.modelName + ". Más info: " + err));
            }
            else {
                let _resultados;
                if (filtro != undefined && filtro.populate != "") {
                    _resultados = APIHelper.comprobarAfterPopulate(resultado, filtro.populate);
                }
                else {
                    _resultados = resultado;
                }
                if (_resultados && _resultados.length > 0) {
                    res.json(APIHelper.buildJsonConsulta(_resultados));
                }
                else {
                    res.json(APIHelper.buildJsonError("No existen registros de la entidad " + model.modelName + "."));
                }
            }
        };
        if (filtro == undefined || filtro.populate == "") {
            model.find({}).exec(obtenerTodos);
        }
        else {
            model.find(filtro.find).populate({ path: filtro.populate, match: filtro.populateFind }).exec(obtenerTodos);
        }
    }
    static getById(model, req, res, filtro = new PeticionJson()) {
        let id = req.params.id;
        if (id != undefined) {
            filtro.find._id = id;
            let obtenerPorId = function (err, resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Error al obtener los registros de la entidad " + model.modelName + ". Más info: " + err));
                }
                else {
                    let _resultado;
                    if (filtro.populate != "") {
                        _resultado = APIHelper.comprobarAfterPopulate(resultado, filtro.populate);
                        _resultado = APIHelper.aplanarPropiedadesPopulated(_resultado, filtro.populate);
                    }
                    else {
                        _resultado = resultado;
                    }
                    if (_resultado != undefined) {
                        res.json(APIHelper.buildJsonConsulta(_resultado));
                    }
                    else {
                        res.json(APIHelper.buildJsonError("No existen registros de la entidad " + model.modelName + " con ID " + id + "."));
                    }
                }
            };
            if (filtro.populate == "") {
                model.find(filtro.find).select(filtro.select).exec(obtenerPorId);
            }
            else {
                model.find(filtro.find).populate({ path: filtro.populate, match: filtro.populateFind }).select(filtro.select).exec(obtenerPorId);
            }
        }
        else {
            res.json(APIHelper.buildJsonError("No se ha aportado ninguna ID de la entidad " + model.modelName + "."));
        }
    }
    static add(model, req, res, filtro = new PeticionJson()) {
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
                filtro.find._id = req.body._id;
                this.update(model, req, res, filtro);
            }
        }
        else {
            res.json(APIHelper.buildJsonError("No se ha transferido ningún objeto a guardar para la entidad " + model.modelName + "."));
        }
    }
    static update(model, req, res, filtro = new PeticionJson()) {
        if (req.body != undefined) {
            model.find(filtro.find).populate({ path: filtro.populate, match: filtro.populateFind }).exec(function (err, resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Error al intentar actualizar un registro en la entidad " + model.modelName + ". Más info: " + err + ". Modelo: " + req.body));
                }
                else {
                    let _resultado;
                    if (filtro.populate != "") {
                        _resultado = APIHelper.comprobarAfterPopulate(resultado, filtro.populate);
                        _resultado = APIHelper.aplanarPropiedadesPopulated(_resultado, filtro.populate);
                    }
                    else {
                        _resultado = resultado;
                    }
                    if (_resultado != undefined && _resultado.length > 0) {
                        if (filtro.find._id == undefined) {
                            filtro.find._id = req.body._id;
                        }
                        model.update(filtro.find, req.body, function (err, resp) {
                            if (err) {
                                res.json(APIHelper.buildJsonError("Error al intentar actualizar un registro en la entidad " + model.modelName + ". Más info: " + err + ". Modelo: " + req.body));
                            }
                            else {
                                res.json(APIHelper.buildJsonGeneric(ResponseStatus.OK));
                            }
                        });
                    }
                    else {
                        res.json(APIHelper.buildJsonError("Error al intentar actualizar un registro en la entidad " + model.modelName + ". Más info: " + err + ". Modelo: " + req.body));
                    }
                }
            });
        }
        else {
            res.json(APIHelper.buildJsonError("No se puede actualizar ningún registro sin body en la petición para la entidad " + model.modelName + "."));
        }
    }
    static delete(model, req, res, filtro = new PeticionJson()) {
        let id = req.params.id;
        if (id != undefined) {
            filtro.find["_id"] = id;
            let borrar = function (err, resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Ha habido un error al eliminar el registro " + id + ". Más info: " + err));
                }
                else {
                    let _resultado;
                    if (filtro.populate != "") {
                        _resultado = resultado[0][filtro.populate] != null ? resultado[0] : undefined;
                        if (_resultado != undefined) {
                            _resultado[filtro.populate] = _resultado[filtro.populate]["_id"];
                        }
                    }
                    else {
                        _resultado = resultado[0];
                    }
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
            };
            if (filtro.populate == "") {
                model.find(filtro.find).exec(borrar);
            }
            else {
                model.find(filtro.find).populate({ path: filtro.populate, match: filtro.populateFind }).exec(borrar);
            }
        }
        else {
            res.json(APIHelper.buildJsonError("No se ha aportado ninguna ID de la entidad " + model.modelName + "."));
        }
    }
    static getByFilterAndSort(model, req, res) {
        let reqBody = JSON.stringify(req.body);
        let objReqBody = JSON.parse(reqBody);
        let sort = objReqBody.sort == undefined ? { "_id": "1" } : objReqBody.sort; // por omisión se ordena por _id
        let find = objReqBody.find == undefined ? { "_id": "1" } : objReqBody.find; // por omisión se busca el _id = 1 forzando error
        let obtenerPorFiltroYOrden = function (err, resultado) {
            if (err) {
                APIHelper.buildJsonError("Ha habido un error a la hora de obtener registros por el filtro " + reqBody + ". Más info: " + err);
            }
            else {
                let _res;
                if (objReqBody.populate != undefined && objReqBody.populate != "") {
                    _res = APIHelper.comprobarAfterPopulate(resultado, objReqBody.populate);
                    _res = APIHelper.aplanarPropiedadesPopulated(_res, objReqBody.populate);
                }
                else {
                    _res = resultado;
                }
                res.json(APIHelper.buildJsonConsulta(_res));
            }
        };
        if (objReqBody.populate == undefined || objReqBody.populate == "") {
            model.find(find).sort(sort).select(objReqBody.select).exec(obtenerPorFiltroYOrden);
        }
        else {
            model.find(find).populate({ path: objReqBody.populate, match: objReqBody.populateFind }).sort(sort).select(objReqBody.select).exec(obtenerPorFiltroYOrden);
        }
    }
}
exports.APIHelper = APIHelper;
