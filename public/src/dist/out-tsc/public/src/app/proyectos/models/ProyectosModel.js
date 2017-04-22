"use strict";
var ProyectoModel = (function () {
    function ProyectoModel() {
        this.nombre = "Nuevo proyecto";
        this.fechaCreacion = new Date();
        this.fechaModificacion = this.fechaCreacion;
        this.cancelado = false;
    }
    ProyectoModel.getProyectosByAutorAndEstado = function (autor, cancelado, angularAPIHelper) {
        if (cancelado === void 0) { cancelado = false; }
        var peticion = angularAPIHelper.buildPeticion({ 'autor': autor, 'cancelado': cancelado }, { 'orden': '1' });
        return angularAPIHelper.postEntryOrFilter('proyectosPorFiltro', JSON.stringify(peticion));
    };
    return ProyectoModel;
}());
exports.ProyectoModel = ProyectoModel;
//# sourceMappingURL=ProyectosModel.js.map