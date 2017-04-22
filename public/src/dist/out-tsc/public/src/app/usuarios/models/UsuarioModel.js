"use strict";
var UsuarioModel = (function () {
    function UsuarioModel() {
    }
    UsuarioModel.getObservableUsuarioById = function (angularAPIHelper, id) {
        return angularAPIHelper.getById('usuario', id);
    };
    UsuarioModel.getObservableUsuarioByEmail = function (angularAPIHelper, _email) {
        return angularAPIHelper.postEntryOrFilter('usuariosPorFiltro', JSON.stringify(angularAPIHelper.buildPeticion({ email: _email }, {})));
    };
    return UsuarioModel;
}());
exports.UsuarioModel = UsuarioModel;
//# sourceMappingURL=UsuarioModel.js.map