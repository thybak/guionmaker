"use strict";

import { AngularAPIHelper } from '../../utils/AngularAPIHelper';

export class ClasificacionModel {
    _id: string;
    nombre: string;

    static getAll(angularAPIHelper: AngularAPIHelper) {
        return angularAPIHelper.getAll('clasificaciones');
    }
}