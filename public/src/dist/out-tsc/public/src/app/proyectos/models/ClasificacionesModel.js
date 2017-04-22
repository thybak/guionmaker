"use strict";
var ClasificacionModel = (function () {
    function ClasificacionModel() {
    }
    ClasificacionModel.getAll = function (angularAPIHelper) {
        return angularAPIHelper.getAll('clasificaciones');
    };
    return ClasificacionModel;
}());
exports.ClasificacionModel = ClasificacionModel;
//# sourceMappingURL=ClasificacionesModel.js.map