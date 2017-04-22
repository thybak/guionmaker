var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ElementRef } from '@angular/core';
import { AngularAPIHelper } from './AngularAPIHelper';
export class Fichero {
}
let GestorSubidaComponent = class GestorSubidaComponent {
    constructor(angularAPIHelper, el) {
        this.angularAPIHelper = angularAPIHelper;
        this.el = el;
    }
    onSubidaImagen() {
        let input = this.el.nativeElement.querySelector('[id="imgSubida"]');
        if (input.files.length > 0) {
            let reader = new FileReader();
            let mimeType = input.files[0].type;
            let size = input.files[0].size;
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
                };
                reader.readAsArrayBuffer(input.files[0]);
            }
            else {
                alert("Asegúrate de subir uno de los formatos permitidos en la aplicación (" + AngularAPIHelper.mimeTypesPermitidos + "). Máximo " + AngularAPIHelper.maximoSizeByFichero + "  bytes.");
            }
        }
    }
    imagenSubida() {
        return this.fichero.base64 != "" && this.fichero.mimeType != "" && this.fichero.base64 != undefined && this.fichero.mimeType != undefined;
    }
    borrarImagen() {
        this.fichero.base64 = "";
        this.fichero.mimeType = "";
    }
};
__decorate([
    Input(),
    __metadata("design:type", Fichero)
], GestorSubidaComponent.prototype, "fichero", void 0);
GestorSubidaComponent = __decorate([
    Component({
        selector: 'gestor-subida',
        templateUrl: './templates/gestor-subida.component.html',
        providers: [AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper, ElementRef])
], GestorSubidaComponent);
export { GestorSubidaComponent };
//# sourceMappingURL=gestor-subida.component.js.map