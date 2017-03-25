import { Component, Input, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { AngularAPIHelper } from './AngularAPIHelper';

export class Fichero {
    base64: string;
    mimeType: string;
}

@Component({
    selector: 'gestor-subida',
    templateUrl: './templates/gestor-subida.component.html',
    providers: [AngularAPIHelper]
})
export class GestorSubidaComponent {
    @Input()
    fichero: Fichero;
    constructor(private angularAPIHelper: AngularAPIHelper, private el: ElementRef) {}

    onSubidaImagen() {
        let input: HTMLInputElement = this.el.nativeElement.querySelector('[id="imgSubida"]');
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
                    this.fichero.base64 = btoa(arrayString);
                    this.fichero.mimeType = mimeType;
                }
                reader.readAsArrayBuffer(input.files[0]);
            } else {
                alert("Asegúrate de subir uno de los formatos permitidos en la aplicación (" + AngularAPIHelper.mimeTypesPermitidos + "). Máximo " + AngularAPIHelper.maximoSizeByFichero + "  bytes.");
            }
        }
    }

    imagenSubida() {
        return this.fichero.base64 != "" && this.fichero.mimeType != "" && this.fichero.base64 != undefined && this.fichero.mimeType != undefined;
    }

    borrarImagen() {
        this.fichero.base64 = "";
    }
}