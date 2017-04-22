"use strict";
export class EscenaModel {
    constructor() {
        this.titulo = 'Nueva escena';
    }
    static cargarEscena(escena) {
        let _escena = new EscenaModel();
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
    }
    eliminar(angularAPIHelper) {
        return angularAPIHelper.deleteById('escena', this._id);
    }
    getTemporalidadString() {
        if (this.noche) {
            return "NOCHE";
        }
        else {
            return "DÍA";
        }
    }
    getSituacionString() {
        if (this.exterior) {
            return "EXT";
        }
        else {
            return "INT";
        }
    }
}
//# sourceMappingURL=EscenasModel.js.map