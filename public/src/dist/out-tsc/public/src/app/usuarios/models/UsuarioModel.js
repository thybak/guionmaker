export class UsuarioModel {
    constructor() { }
    static getObservableUsuarioById(angularAPIHelper, id) {
        return angularAPIHelper.getById('usuario', id);
    }
    static getObservableUsuarioByEmail(angularAPIHelper, _email) {
        return angularAPIHelper.postEntryOrFilter('usuariosPorFiltro', JSON.stringify(angularAPIHelper.buildPeticion({ email: _email }, {})));
    }
}
//# sourceMappingURL=UsuarioModel.js.map