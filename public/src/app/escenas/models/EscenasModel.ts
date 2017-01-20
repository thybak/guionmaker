"use strict";

import { AngularAPIHelper } from '../../utils/AngularAPIHelper';

export class EscenaModel {
    _id: string;
    titulo: string;
    orden: number;
    destacado: boolean;
    detalleTecnico: string;
    detalleLiterario: string;
    proyecto: string;
    fechaCreacion: Date;

    constructor() {
        this.titulo = 'Nueva escena';
    }
}