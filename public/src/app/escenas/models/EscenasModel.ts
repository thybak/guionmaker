"use strict";
import { AngularAPIHelper } from '../../utils/AngularAPIHelper';
import { Router } from '@angular/router';

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

    static cargarEscena(escena: any): EscenaModel {
        let _escena = new EscenaModel();
        _escena._id = escena._id;
        _escena.titulo = escena.titulo;
        _escena.orden = escena.orden;
        _escena.destacado = escena.destacado;
        _escena.detalleTecnico = escena.detalleTecnico;
        _escena.detalleLiterario = escena.detalleLiterario;
        _escena.proyecto = escena.proyecto;
        _escena.fechaCreacion = escena.fechaCreacion;
        return _escena;
    }

    eliminar(angularAPIHelper: AngularAPIHelper, router: Router) {
        angularAPIHelper.deleteById('escena', this._id).subscribe(null, null, () => {
            if (router != undefined) {
                router.navigate(['/escenas']);
            }
        });
    }
}