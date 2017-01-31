"use strict";

import { AngularAPIHelper } from '../../utils/AngularAPIHelper';

export class GeneroModel {
    _id: string;
    nombre: string;

    static getAll(angularAPIHelper: AngularAPIHelper) {
        return angularAPIHelper.getAll('generos');
    }
}