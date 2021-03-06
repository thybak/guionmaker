"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Usuarios_1 = require("./Usuarios");
var PlantillaModel = /** @class */ (function () {
    function PlantillaModel() {
    }
    return PlantillaModel;
}());
var Plantilla = /** @class */ (function () {
    function Plantilla() {
        this.schema = new mongoose.Schema({
            htmlPortada: String,
            htmlEscena: String,
            nombre: String,
            autor: { type: mongoose.Schema.Types.ObjectId, ref: Usuarios_1.Usuario.name, required: true },
            porDefecto: Boolean,
            fechaCreacion: { type: Date, default: Date.now },
            fechaModificacion: Date
        });
        this.schema.post('findOneAndUpdate', function (plantilla) {
            if (plantilla['porDefecto']) {
                mongoose.model(Plantilla.name).find({ $and: [{ "_id": { "$ne": plantilla['_id'] } }, { "porDefecto": 1 }, { "autor": plantilla['autor'] }] }).exec(function (err, res) {
                    if (err) {
                        console.log("Error al obtener la anterior plantilla por defecto del usuario " + err);
                    }
                    else if (res != undefined && res.length > 0) {
                        res[0]["porDefecto"] = false;
                        mongoose.model(Plantilla.name).update({ "_id": res[0]._id }, res[0], function (err, raw) {
                            if (err) {
                                console.log("Error al actualizar la anterior plantilla por defecto del usuario " + err);
                            }
                            else {
                                console.log("Éxito al actualizar la anterior plantilla por defecto del usuario");
                            }
                        });
                    }
                });
            }
        });
        mongoose.model(Plantilla.name, this.schema);
    }
    Plantilla.current = new Plantilla();
    return Plantilla;
}());
exports.Plantilla = Plantilla;
//# sourceMappingURL=Plantillas.js.map