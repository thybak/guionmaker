import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { EscenaModel } from './models/EscenasModel';
import { DetalleLiterarioModel } from './models/DetallesLiterariosModel';
import { DetalleTecnicoModel } from './models/DetallesTecnicosModel';

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
    escena: EscenaModel;
    detalleLiterario: DetalleLiterarioModel;
    detalleTecnico: DetalleTecnicoModel;
    botonesGuardado: BotonesGuardado;
    base64Imagen: SafeUrl;

    constructor(private angularAPIHelper: AngularAPIHelper, private el: ElementRef, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute) {
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompleto();
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.route.params.switchMap((params: Params) => this.angularAPIHelper.getById('escena', params['id'])).
            subscribe(response => this.cargarModelo(response),
            error => console.log('Error:' + error));
    }

    private cargarModelo(response) {
        this.escena = (response as RespuestaJson).consulta[0] as EscenaModel;
        if (this.escena != undefined) {
            if (this.escena.detalleLiterario != undefined) {
                this.angularAPIHelper.getById('detalleLiterario', this.escena.detalleLiterario)
                    .subscribe(response => {
                        this.detalleLiterario = (response as RespuestaJson).consulta[0] as DetalleLiterarioModel;
                        this.detalleLiterario.texto = this.detalleLiterario.texto == "" ? new String('') : this.detalleLiterario.texto; // workaround por culpa del componente ng2-summernote donde con "" no se muestra nada.
                    },
                    error => console.log('Error:' + error));
            } else {
                this.detalleLiterario = new DetalleLiterarioModel();
            }
            if (this.escena.detalleTecnico != undefined) {
                this.angularAPIHelper.getById('detalleTecnico', this.escena.detalleTecnico)
                    .subscribe(response => {
                        this.detalleTecnico = (response as RespuestaJson).consulta[0] as DetalleTecnicoModel;
                        this.base64Imagen = this.sanitizer.bypassSecurityTrustUrl(DetalleTecnicoModel.getDataUrl(this.detalleTecnico));
                        this.detalleTecnico.texto = this.detalleTecnico.texto == "" ? new String('') : this.detalleTecnico.texto;
                    }, 
                    error => console.log('Error: ' + error));
            } else {
                this.detalleTecnico = new DetalleTecnicoModel();
            }
        }
    }

    private guardarEscena(response) {
        let resultadoDetalleTecnico = (response as RespuestaJson).insertado as DetalleTecnicoModel;
        if (resultadoDetalleTecnico != undefined) {
            this.escena.detalleTecnico = resultadoDetalleTecnico._id;
            this.detalleTecnico = resultadoDetalleTecnico;
        }
        this.angularAPIHelper.postEntryOrFilter('escena', JSON.stringify(this.escena)).subscribe(null, error => this.confirmacionGuardado.setEstadoGuardado(false), () => this.confirmacionGuardado.setEstadoGuardado(true));
    }

    private guardarDetalles(response) {
        let resultadoDetalleLiterario = (response as RespuestaJson).insertado as DetalleLiterarioModel;
        if (resultadoDetalleLiterario != undefined) {
            this.escena.detalleLiterario = resultadoDetalleLiterario._id;
            this.detalleLiterario = resultadoDetalleLiterario;
        }
        this.angularAPIHelper.postEntryOrFilter('detalleTecnico', JSON.stringify(this.detalleTecnico))
            .subscribe(response => this.guardarEscena(response),
            error => this.confirmacionGuardado.setEstadoGuardado(false));
    }

    private guardarCambios() {
        this.angularAPIHelper.postEntryOrFilter('detalleLiterario', JSON.stringify(this.detalleLiterario))
            .subscribe(response => this.guardarDetalles(response),
            error => this.confirmacionGuardado.setEstadoGuardado(false));
    }

    onSubidaImagen() {
        let input: HTMLInputElement = this.el.nativeElement.querySelector('[id="imgTecnica"]');
        if (input.files.length > 0) {
            let reader = new FileReader();
            let mimeType: string = input.files[0].type;
            let size: number = input.files[0].size;
            if (this.angularAPIHelper.mimeTypePermitido(mimeType) && this.angularAPIHelper.sizeOfFicheroAdecuado(size)) {
                reader.onloadend = () => {
                    let array = new Uint8Array(reader.result);
                    let CHUNK_SZ = 0x8000;
                    let c = [];
                    for (var i = 0; i < array.length; i += CHUNK_SZ) {
                        c.push(String.fromCharCode.apply(null, array.subarray(i, i + CHUNK_SZ)));
                    }
                    let arrayString = c.join("");
                    this.detalleTecnico.imagen = btoa(arrayString);
                    this.detalleTecnico.mimeType = mimeType; 
                    this.base64Imagen = this.sanitizer.bypassSecurityTrustUrl(DetalleTecnicoModel.getDataUrl(this.detalleTecnico));
                }
                reader.readAsArrayBuffer(input.files[0]);
            } else {
                alert("Asegúrate de subir uno de los formatos permitidos en la aplicación (" + AngularAPIHelper.mimeTypesPermitidos +  "). Máximo " + AngularAPIHelper.maximoSizeByFichero + "  bytes.");
            }
        }
    }

    borrarImagen() {
        this.detalleTecnico.imagen = "";
    }

    imagenSubida(): boolean {
        return this.detalleTecnico.imagen != undefined && this.detalleTecnico.imagen != "";
    }

    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.guardarCambios();
            this.confirmacionGuardado.setTimeoutRetirarAviso();
        } else if (event == TipoOperacionGuardado.Volver) {
            this.router.navigate(['/escenas']);
        } else if (event == TipoOperacionGuardado.Eliminar) {
            let escena = EscenaModel.cargarEscena(this.escena);
            escena.eliminar(this.angularAPIHelper).subscribe(null, null, () => this.router.navigate(['/escenas']));
        }
    }
}