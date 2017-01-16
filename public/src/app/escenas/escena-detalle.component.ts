import { Component, ElementRef } from '@angular/core';
import { EscenaModel } from '../../../../models/EscenasModel';
import { DetalleLiterarioModel } from '../../../../models/DetallesLiterariosModel';
import { DetalleTecnicoModel } from '../../../../models/DetallesTecnicosModel';
import { RespuestaJson, AngularAPIHelper } from '../utils/AngularAPIHelper';
import { ConfirmacionGuardado } from '../utils/confirmacion-guardado.component';
import { BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';
import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';

@Component({
    templateUrl: './templates/escena-detalle.component.html',
    providers: [AngularAPIHelper],
    selector: 'detalle-escena'
})
export class DetalleEscenaComponent {
    confirmacionGuardado: ConfirmacionGuardado;
    angularAPIHelper: AngularAPIHelper;
    escena: EscenaModel;
    mostrarDetalleTecnico: boolean;
    detalleLiterario: DetalleLiterarioModel;
    detalleTecnico: DetalleTecnicoModel; 
    botonesGuardado: BotonesGuardado;

    constructor(angularAPIHelper: AngularAPIHelper, private el: ElementRef) {
        this.angularAPIHelper = angularAPIHelper;
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompleto();
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.mostrarDetalleTecnico = true; // donde aquí está el booleano debe ser uno de los parámetros que debe venir por la ruta.
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
            if (this.escena.detalleTecnico != undefined) {
                this.angularAPIHelper.getById('detalleTecnico', this.escena.detalleTecnico)
                    .subscribe(response => this.detalleTecnico = (response as RespuestaJson).consulta[0] as DetalleTecnicoModel,
                    error => console.log('Error: ' + error));
            } else {
                this.detalleTecnico = new DetalleTecnicoModel();
            }
        }
    }

    private guardarEscena(response): boolean {
        let isOk: boolean = true;
        let resultadoDetalleTecnico = (response as RespuestaJson).insertado as DetalleTecnicoModel;
        if (resultadoDetalleTecnico != undefined) {
            this.escena.detalleTecnico = resultadoDetalleTecnico._id;
            this.detalleTecnico = resultadoDetalleTecnico;
        }
        this.angularAPIHelper.postEntryOrFilter('escena', JSON.stringify(this.escena)).subscribe(error => isOk = false);
        return isOk;
    }

    private guardarDetalles(response): boolean {
        let isOk: boolean = true;
        let resultadoDetalleLiterario = (response as RespuestaJson).insertado as DetalleLiterarioModel;
        if (resultadoDetalleLiterario != undefined) {
            this.escena.detalleLiterario = resultadoDetalleLiterario._id;
            this.detalleLiterario = resultadoDetalleLiterario;
        }
        this.angularAPIHelper.postEntryOrFilter('detalleTecnico', JSON.stringify(this.detalleTecnico))
            .subscribe(response => isOk = this.guardarEscena(response),
            error => isOk = false);
        return isOk;
    }

    private guardarCambios() {
        let isOk: boolean = true; // primero hay que guardar los detalles y luego las escenas
        this.angularAPIHelper.postEntryOrFilter('detalleLiterario', JSON.stringify(this.detalleLiterario))
            .subscribe(response => isOk = this.guardarDetalles(response),
            error => isOk = false);
        this.confirmacionGuardado.setEstadoGuardado(isOk);
    }

    onSubidaImagen() {
        let input: HTMLInputElement = this.el.nativeElement.querySelector('[id="imgTecnica"]');
        if (input.files.length > 0) {
            // leer el array de bytes para guardar el base64.
        }
    }

    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.guardarCambios();
            this.confirmacionGuardado.setTimeoutRetirarAviso();
        } // queda añadir el borrado
    }
}