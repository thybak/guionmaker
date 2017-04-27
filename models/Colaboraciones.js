"use strict";
var mongoose = require("mongoose");
var Usuarios_1 = require("./Usuarios");
var Proyectos_1 = require("./Proyectos");
var PermisosColaboracion;
(function (PermisosColaboracion) {
    PermisosColaboracion[PermisosColaboracion["SoloLectura"] = 0] = "SoloLectura";
    PermisosColaboracion[PermisosColaboracion["Edicion"] = 1] = "Edicion";
})(PermisosColaboracion = exports.PermisosColaboracion || (exports.PermisosColaboracion = {}));
var Colaboracion = (function () {
    function Colaboracion() {
        this.schema = new mongoose.Schema({
            usuario: { type: mongoose.Schema.Types.ObjectId, ref: Usuarios_1.Usuario.name },
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyectos_1.Proyecto.name },
            fecha: Date,
            permisos: Number
        });
        this.schema.index({ usuario: 1, proyecto: 1 }, { unique: true });
        this.schema.methods.guardarEstadoColaboraciones = function (proyectoId, oProyecto) {
            console.log(oProyecto);
            mongoose.model(Proyectos_1.Proyecto.name).update({ _id: proyectoId }, oProyecto, function (err, res) {
                if (err) {
                    console.log("Error al actualizar proyecto");
                }
                else {
                    console.log("Todo bien al guardar el proyecto " + proyectoId);
                }
            });
        };
        this.schema.post('save', function (colaboracion) {
            var _this = this;
            console.log("Guardar");
            if (colaboracion != undefined) {
                mongoose.model(Proyectos_1.Proyecto.name).findById(this.proyecto).exec(function (err, proyecto) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var oProyecto = proyecto.toJSON();
                        if (oProyecto != undefined && oProyecto.colaboradores.indexOf(_this._id + '') < 0) {
                            oProyecto.colaboradores = oProyecto.colaboradores == undefined ? [] : oProyecto.colaboradores;
                            oProyecto.colaboradores.push(colaboracion._id);
                            _this.guardarEstadoColaboraciones(_this.proyecto, oProyecto);
                        }
                    }
                });
            }
        });
        this.schema.post('remove', function (colaboracion) {
            var _this = this;
            console.log("Eliminar");
            if (colaboracion != undefined) {
                mongoose.model(Proyectos_1.Proyecto.name).findById(this.proyecto).exec(function (err, proyecto) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var oProyecto = proyecto.toJSON();
                        var idxColaboracion = -1;
                        for (var idx = 0; idx < oProyecto.colaboradores.length; idx++) {
                            if (_this._id + '' == oProyecto.colaboradores[idx] + '') {
                                idxColaboracion = idx;
                                break;
                            }
                        }
                        if (oProyecto != undefined && idxColaboracion >= 0) {
                            oProyecto.colaboradores.splice(idxColaboracion, 1);
                            _this.guardarEstadoColaboraciones(_this.proyecto, oProyecto);
                        }
                    }
                });
            }
        });
        mongoose.model(Colaboracion.name, this.schema);
    }
    return Colaboracion;
}());
Colaboracion.current = new Colaboracion();
exports.Colaboracion = Colaboracion;
//# sourceMappingURL=Colaboraciones.js.map