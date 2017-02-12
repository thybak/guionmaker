import { AngularAPIHelper } from '../../utils/AngularAPIHelper';

export class UsuarioModel {
    _id: string;
    nombre: string;
    apellidos: string;
    email: string;
    nombreUsuario: string;
    pass: string;

    constructor() { }

    static getObservableUsuarioById(angularAPIHelper: AngularAPIHelper, id: string) {
        return angularAPIHelper.getById('usuario', id);
    }
    static getObservableUsuarioByEmail(angularAPIHelper: AngularAPIHelper, _email: string) {
        return angularAPIHelper.postEntryOrFilter('usuariosPorFiltro', JSON.stringify(angularAPIHelper.buildPeticion({ email: _email }, {})));
    }
}