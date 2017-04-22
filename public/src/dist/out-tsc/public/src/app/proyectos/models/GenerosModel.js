"use strict";
var GeneroModel = (function () {
    function GeneroModel() {
    }
    GeneroModel.getAll = function (angularAPIHelper) {
        return angularAPIHelper.getAll('generos');
    };
    return GeneroModel;
}());
exports.GeneroModel = GeneroModel;
//# sourceMappingURL=GenerosModel.js.map