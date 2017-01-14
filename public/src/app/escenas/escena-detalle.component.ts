import { Component } from '@angular/core';
import { EscenaModel } from '../../../../models/EscenasModel';
import { DetalleLiterarioModel } from '../../../../models/DetallesLiterariosModel';
import { DetalleTecnicoModel } from '../../../../models/DetallesTecnicosModel';
import { RespuestaJson, AngularAPIHelper } from '../utils/AngularAPIHelper';
import { ConfirmacionGuardado } from '../utils/confirmacion-guardado.component';
import { BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';

@Component({
    templateUrl: './templates/escena-detalle.component.html',
    providers: [AngularAPIHelper],
    selector: 'detalle-escena'
})
export class DetalleEscenaComponent {
    confirmacionGuardado: ConfirmacionGuardado;
    angularAPIHelper: AngularAPIHelper;
    escena: EscenaModel;
    detalleLiterario: DetalleLiterarioModel;
    detalleTecnico: DetalleTecnicoModel; // por ahora solo literario!!
    botonesGuardado: BotonesGuardado;

    constructor(angularAPIHelper: AngularAPIHelper) {
        this.angularAPIHelper = angularAPIHelper;
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompleto();
        this.confirmacionGuardado = new ConfirmacionGuardado();
        let id: string = '5846fbbbef72c01298cfd5ad'; // donde aquí está el id en el futuro se debe incluir el parámetro que venga desde la ruta.
        if (id != "-1" && id.length == 24) { // mejorable la comprobación de si tiene formato de object id en mongodb
            this.angularAPIHelper.getById('escena', id)
                .subscribe(response => this.cargarModelo(response),
                error => console.log('Error:' + error));
        }
    }

    private cargarModelo(response) {
        this.escena = (response as RespuestaJson).consulta[0] as EscenaModel;
        if (this.escena != undefined) {
            if (this.escena.detalleLiterario != undefined) {
                this.angularAPIHelper.getById('detalleLiterario', this.escena.detalleLiterario)
                    .subscribe(response => this.detalleLiterario = (response as RespuestaJson).consulta[0] as DetalleLiterarioModel,
                    error => console.log('Error:' + error));
            } else {
                this.detalleLiterario = new DetalleLiterarioModel();
            }
        }
    }

    private guardarCambios() {
        let isOk: boolean = true;
        this.angularAPIHelper.postEntryOrFilter('escena', JSON.stringify(this.escena)).subscribe(error => isOk = false);
        this.angularAPIHelper.postEntryOrFilter('detalleLiterario', JSON.stringify(this.detalleLiterario)).subscribe(error => isOk = false);
        this.confirmacionGuardado.setEstadoGuardado(isOk);
    }

    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.guardarCambios();
            this.confirmacionGuardado.setTimeoutRetirarAviso();
        } // queda añadir el borrado
    }
}