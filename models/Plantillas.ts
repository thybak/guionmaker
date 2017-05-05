"use strict";

import * as mongoose from "mongoose";
import { Usuario } from "./Usuarios";

class PlantillaModel {
    htmlPortada: string;
    htmlEscena: string;
    nombre: string;
    autor: string;
    porDefecto: boolean;
    fechaCreacion: Date;
    fechaModificacion: Date;
}
export class Plantilla {
    schema: mongoose.Schema;
    static current: Plantilla = new Plantilla();

    constructor() {
        this.schema = new mongoose.Schema({
            htmlPortada: String,
            htmlEscena: String,
            nombre: String,
            autor: { type: mongoose.Schema.Types.ObjectId, ref: Usuario.name },
            porDefecto: Boolean,
            fechaCreacion: { type: Date, default: Date.now },
            fechaModificacion: Date
        });
        this.schema.post('findOneAndUpdate', function (plantilla) {
            mongoose.model(Plantilla.name).find({ $and: [{ "_id": { "$ne": plantilla['_id'] } }, { "porDefecto": 1 }, { "autor": plantilla['autor'] }] }).exec((err, res) => {
                if (err) {
                    console.log("Error al obtener la anterior plantilla por defecto del usuario " + err);
                } else if (res != undefined && res.length > 0) {
                    res[0]["porDefecto"] = false;
                    mongoose.model(Plantilla.name).update({ "_id": res[0]._id }, res[0], (err, raw) => {
                        if (err) {
                            console.log("Error al actualizar la anterior plantilla por defecto del usuario " + err);
                        } else {
                            console.log("Éxito al actualizar la anterior plantilla por defecto del usuario");
                        }
                    });
                }
            });
        });
        mongoose.model(Plantilla.name, this.schema);
    }
}