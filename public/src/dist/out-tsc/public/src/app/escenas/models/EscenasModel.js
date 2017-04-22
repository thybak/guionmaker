"use strict";
var EscenaModel = (function () {
    function EscenaModel() {
        this.titulo = 'Nueva escena';
    }
    EscenaModel.cargarEscena = function (escena) {
        var _escena = new EscenaModel();
        _escena._id = escena._id;
        _escena.titulo = escena.titulo;
        _escena.orden = escena.orden;
        _escena.destacado = escena.destacado;
        _escena.noche = escena.noche;
        _escena.exterior = escena.exterior;
        _escena.detalleTecnico = escena.detalleTecnico;
        _escena.detalleLiterario = escena.detalleLiterario;
        _escena.proyecto = escena.proyecto;
        _escena.fechaCreacion = escena.fechaCreacion;
        return _escena;
    };
    EscenaModel.prototype.eliminar = function (angularAPIHelper) {
        return angularAPIHelper.deleteById('escena', this._id);
    };
    EscenaModel.prototype.getTemporalidadString = function () {
        if (this.noche) {
            return "NOCHE";
        }
        else {
            return "DÍA";
        }
    };
    EscenaModel.prototype.getSituacionString = function () {
        if (this.exterior) {
            return "EXT";
        }
        else {
            return "INT";
        }
    };
    return EscenaModel;
}());
exports.EscenaModel = EscenaModel;
//# sourceMappingURL=EscenasModel.js.map