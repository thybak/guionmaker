"use strict";
import * as mongoose from "mongoose";

import { Usuario } from "./Usuarios";
import { Proyecto, ProyectoModel } from "./Proyectos";

export enum PermisosColaboracion {
    SoloLectura,
    Edicion
}

export class Colaboracion {
    schema: mongoose.Schema;
    static current: Colaboracion = new Colaboracion();


    private constructor() {
        this.schema = new mongoose.Schema({
            usuario: { type: mongoose.Schema.Types.ObjectId, ref: Usuario.name },
            proyecto: { type: mongoose.Schema.Types.ObjectId, ref: Proyecto.name },
            fecha: Date,
            permisos: Number
        });
        this.schema.index({ usuario: 1, proyecto: 1 }, { unique: true });
        this.schema.methods.guardarEstadoColaboraciones = function (proyectoId: string, oProyecto: ProyectoModel) {
            console.log(oProyecto);
            mongoose.model(Proyecto.name).update({ _id: proyectoId }, oProyecto, (err, res) => {
                if (err) {
                    console.log("Error al actualizar proyecto");
                } else {
                    console.log("Todo bien al guardar el proyecto " + proyectoId);
                }
            });
        };
        this.schema.post('save', function (colaboracion) {
            console.log("Guardar");
            if (colaboracion != undefined) {
                mongoose.model(Proyecto.name).findById(this.proyecto).exec((err, proyecto) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let oProyecto = proyecto.toJSON() as ProyectoModel;
                        if (oProyecto != undefined && oProyecto.colaboradores.indexOf(this._id + '') < 0) {
                            oProyecto.colaboradores = oProyecto.colaboradores == undefined ? [] : oProyecto.colaboradores;
                            oProyecto.colaboradores.push(colaboracion._id);
                            this.guardarEstadoColaboraciones(this.proyecto, oProyecto);
                        }
                    }
                });
            }
        });
        this.schema.post('remove', function (colaboracion) {
            console.log("Eliminar");
            if (colaboracion != undefined) {
                mongoose.model(Proyecto.name).findById(this.proyecto).exec((err, proyecto) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let oProyecto = proyecto.toJSON() as ProyectoModel;
                        let idxColaboracion = -1;
                        for (let idx = 0; idx < oProyecto.colaboradores.length; idx++) {
                            if (this._id + '' == oProyecto.colaboradores[idx] + '') { // forzar su conversión a string
                                idxColaboracion = idx;
                                break;
                            }
                        }
                        if (oProyecto != undefined && idxColaboracion >= 0) {
                            oProyecto.colaboradores.splice(idxColaboracion, 1);
                            this.guardarEstadoColaboraciones(this.proyecto, oProyecto);
                        }
                    }
                });
            }
        });

        mongoose.model(Colaboracion.name, this.schema);
    }
}