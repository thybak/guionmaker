"use strict";
export class ProyectoModel {
    constructor() {
        this.nombre = "Nuevo proyecto";
        this.fechaCreacion = new Date();
        this.fechaModificacion = this.fechaCreacion;
        this.cancelado = false;
    }
    static getProyectosByAutorAndEstado(autor, cancelado = false, angularAPIHelper) {
        let peticion = angularAPIHelper.buildPeticion({ 'autor': autor, 'cancelado': cancelado }, { 'orden': '1' });
        return angularAPIHelper.postEntryOrFilter('proyectosPorFiltro', JSON.stringify(peticion));
    }
}
//# sourceMappingURL=ProyectosModel.js.map