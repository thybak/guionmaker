import { Component, Input } from '@angular/core';
import { EscenaModel } from '../../../models/EscenasModel';
import { RespuestaJson, AngularAPIHelper } from './utils/AngularAPIHelper';

@Component({
    selector: 'escenas-list',
    templateUrl: './templates/escenasList.component.html',
    providers: [AngularAPIHelper]
})
export class EscenasListComponent {
    escenas: EscenaModel[];
    angularAPIHelper: AngularAPIHelper;
    constructor(angularAPIHelper: AngularAPIHelper) {
        //angularAPIHelper.getById('escena', '5846ffc2b7b0002500e74b62')
        //    .subscribe(response => this.escenas = (response as RespuestaJson).consulta as EscenaModel[],
        //    error => console.error('Error: ' + error),
        //    () => console.log('Llamada realizada con éxito'));
        let filtro = {
            "proyecto": "57f1687fe942851c18cec84b"
        }
        angularAPIHelper.getByFilter('escenasPorFiltro', JSON.stringify(filtro))
            .subscribe(response => this.escenas = (response as RespuestaJson).consulta as EscenaModel[],
            error => console.error('Error: ' + error),
            () => console.log('Actualizado'));
    }

}
