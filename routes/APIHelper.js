"use strict";
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["OK"] = 0] = "OK";
    ResponseStatus[ResponseStatus["KO"] = 1] = "KO";
})(ResponseStatus || (ResponseStatus = {}));
var RespuestaJson = (function () {
    function RespuestaJson() {
    }
    return RespuestaJson;
}());
var PeticionJson = (function () {
    function PeticionJson() {
        this.find = {};
        this.sort = {};
        this.select = "";
        this.populate = {};
        this.modoColaborador = false;
    }
    return PeticionJson;
}());
exports.PeticionJson = PeticionJson;
var APIHelper = (function () {
    function APIHelper() {
    }
    APIHelper.buildJsonGeneric = function (estado) {
        var respuesta = new RespuestaJson();
        respuesta.estado = estado;
        return respuesta;
    };
    APIHelper.buildJsonError = function (mensaje) {
        var respuesta = new RespuestaJson();
        respuesta.estado = ResponseStatus.KO;
        respuesta.error = mensaje;
        return respuesta;
    };
    APIHelper.buildJsonConsulta = function (resultado) {
        var respuesta = new RespuestaJson();
        respuesta.estado = ResponseStatus.OK;
        respuesta.consulta = resultado;
        return respuesta;
    };
    APIHelper.buildJsonLogin = function (resultado) {
        var respuesta = new RespuestaJson();
        respuesta.estado = ResponseStatus.OK;
        respuesta.login = resultado;
        return respuesta;
    };
    APIHelper.buildJsonInsercion = function (resultado) {
        var respuesta = new RespuestaJson();
        respuesta.estado = ResponseStatus.OK;
        respuesta.insertado = resultado;
        return respuesta;
    };
    APIHelper.comprobarAfterPopulate = function (resultados, propiedad) {
        var _resultados = [];
        for (var _i = 0, resultados_1 = resultados; _i < resultados_1.length; _i++) {
            var resultado = resultados_1[_i];
            if (resultado[propiedad] != null) {
                _resultados.push(resultado);
            }
        }
        return _resultados;
    };
    APIHelper.aplanarPropiedadesPopulated = function (resultados, propiedad) {
        var _resultados = [];
        for (var _i = 0, resultados_2 = resultados; _i < resultados_2.length; _i++) {
            var resultado = resultados_2[_i];
            resultado[propiedad] = resultado[propiedad]["_id"];
            _resultados.push(resultado);
        }
        return _resultados;
    };
    APIHelper.getAll = function (model, req, res, filtro) {
        if (filtro === void 0) { filtro = undefined; }
        var obtenerTodos = function (err, resultado) {
            if (err) {
                res.json(APIHelper.buildJsonError("Error al obtener los registros de la entidad " + model.modelName + ". Más info: " + err));
            }
            else {
                var _resultados = void 0;
                if (filtro != undefined && filtro.populate.path != "") {
                    _resultados = APIHelper.comprobarAfterPopulate(resultado, filtro.populate.path);
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
        if (filtro == undefined || filtro.populate == undefined || filtro.populate.path == "") {
            model.find({}).exec(obtenerTodos);
        }
        else {
            model.find(filtro.find).populate(filtro.populate).exec(obtenerTodos);
        }
    };
    APIHelper.getById = function (model, req, res, filtro) {
        if (filtro === void 0) { filtro = new PeticionJson(); }
        var id = req.params.id;
        if (id != undefined) {
            filtro.find._id = id;
            var obtenerPorId = function (err, resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Error al obtener los registros de la entidad " + model.modelName + ". Más info: " + err));
                }
                else {
                    var _resultado = void 0;
                    if (Object.keys(filtro.populate).length > 0 && filtro.populate.path != "") {
                        _resultado = APIHelper.comprobarAfterPopulate(resultado, filtro.populate.path);
                        _resultado = APIHelper.aplanarPropiedadesPopulated(_resultado, filtro.populate.path);
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
            if (Object.keys(filtro.populate).length == 0) {
                model.find(filtro.find).select(filtro.select).exec(obtenerPorId);
            }
            else {
                model.find(filtro.find).populate(filtro.populate).select(filtro.select).exec(obtenerPorId);
            }
        }
        else {
            res.json(APIHelper.buildJsonError("No se ha aportado ninguna ID de la entidad " + model.modelName + "."));
        }
    };
    APIHelper.add = function (model, req, res, filtro) {
        if (filtro === void 0) { filtro = new PeticionJson(); }
        if (req.body != undefined) {
            if (req.body._id == undefined) {
                var nuevoRegistro = new model(req.body);
                nuevoRegistro.save(function (err, _resultado) {
                    if (err) {
                        console.log(err);
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
    };
    APIHelper.update = function (model, req, res, filtro) {
        if (filtro === void 0) { filtro = new PeticionJson(); }
        if (req.body != undefined) {
            model.find(filtro.find).populate(Object.keys(filtro.populate).length > 0 ? filtro.populate : "").exec(function (err, resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Error al intentar actualizar un registro en la entidad " + model.modelName + ". Más info: " + err + ". Modelo: " + req.body));
                }
                else {
                    var _resultado = void 0;
                    if (Object.keys(filtro.populate).length > 0 && filtro.populate.path != "") {
                        _resultado = APIHelper.comprobarAfterPopulate(resultado, filtro.populate.path);
                        _resultado = APIHelper.aplanarPropiedadesPopulated(_resultado, filtro.populate.path);
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
    };
    APIHelper.delete = function (model, req, res, filtro) {
        if (filtro === void 0) { filtro = new PeticionJson(); }
        var id = req.params.id;
        if (id != undefined) {
            filtro.find["_id"] = id;
            var borrar = function (err, resultado) {
                if (err) {
                    res.json(APIHelper.buildJsonError("Ha habido un error al eliminar el registro " + id + ". Más info: " + err));
                }
                else {
                    var _resultado_1;
                    if (Object.keys(filtro.populate).length > 0 && filtro.populate.path != "") {
                        _resultado_1 = resultado[0][filtro.populate.path] != null ? resultado[0] : undefined;
                        if (_resultado_1 != undefined) {
                            _resultado_1[filtro.populate.path] = _resultado_1[filtro.populate.path]["_id"];
                        }
                    }
                    else {
                        _resultado_1 = resultado[0];
                    }
                    if (_resultado_1 != undefined) {
                        model.remove(_resultado_1).exec(function (err) {
                            if (err) {
                                res.json(APIHelper.buildJsonError("Ha habido un error al eliminar el registro " + _resultado_1 + ". Más info: " + err));
                            }
                            else {
                                _resultado_1.remove();
                                res.json(APIHelper.buildJsonGeneric(ResponseStatus.OK));
                            }
                        });
                    }
                }
            };
            if (Object.keys(filtro.populate).length == 0) {
                model.find(filtro.find).exec(borrar);
            }
            else {
                model.find(filtro.find).populate(filtro.populate).exec(borrar);
            }
        }
        else {
            res.json(APIHelper.buildJsonError("No se ha aportado ninguna ID de la entidad " + model.modelName + "."));
        }
    };
    APIHelper.getByFilterAndSort = function (model, req, res) {
        var reqBody = JSON.stringify(req.body);
        var objReqBody = JSON.parse(reqBody);
        var sort = objReqBody.sort == undefined ? { "_id": "1" } : objReqBody.sort; // por omisión se ordena por _id
        var find = objReqBody.find == undefined ? { "_id": "1" } : objReqBody.find; // por omisión se busca el _id = 1 forzando error
        var obtenerPorFiltroYOrden = function (err, resultado) {
            if (err) {
                APIHelper.buildJsonError("Ha habido un error a la hora de obtener registros por el filtro " + reqBody + ". Más info: " + err);
            }
            else {
                var _res = void 0;
                if (objReqBody.populate != undefined && objReqBody.populate.path != "") {
                    _res = APIHelper.comprobarAfterPopulate(resultado, objReqBody.populate.path);
                    _res = APIHelper.aplanarPropiedadesPopulated(_res, objReqBody.populate.path);
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
            model.find(find).populate(objReqBody.populate).sort(sort).select(objReqBody.select).exec(obtenerPorFiltroYOrden);
        }
    };
    return APIHelper;
}());
exports.APIHelper = APIHelper;
//# sourceMappingURL=APIHelper.js.map