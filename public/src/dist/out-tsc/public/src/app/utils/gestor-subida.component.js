"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var AngularAPIHelper_1 = require("./AngularAPIHelper");
var Fichero = (function () {
    function Fichero() {
    }
    return Fichero;
}());
exports.Fichero = Fichero;
var GestorSubidaComponent = (function () {
    function GestorSubidaComponent(angularAPIHelper, el) {
        this.angularAPIHelper = angularAPIHelper;
        this.el = el;
    }
    GestorSubidaComponent.prototype.onSubidaImagen = function () {
        var _this = this;
        var input = this.el.nativeElement.querySelector('[id="imgSubida"]');
        if (input.files.length > 0) {
            var reader_1 = new FileReader();
            var mimeType_1 = input.files[0].type;
            var size = input.files[0].size;
            if (this.angularAPIHelper.mimeTypePermitido(mimeType_1) && this.angularAPIHelper.sizeOfFicheroAdecuado(size)) {
                reader_1.onloadend = function () {
                    var array = new Uint8Array(reader_1.result);
                    var CHUNK_SZ = 0x8000;
                    var c = [];
                    for (var i = 0; i < array.length; i += CHUNK_SZ) {
                        c.push(String.fromCharCode.apply(null, array.subarray(i, i + CHUNK_SZ)));
                    }
                    var arrayString = c.join("");
                    _this.fichero.base64 = btoa(arrayString);
                    _this.fichero.mimeType = mimeType_1;
                };
                reader_1.readAsArrayBuffer(input.files[0]);
            }
            else {
                alert("Asegúrate de subir uno de los formatos permitidos en la aplicación (" + AngularAPIHelper_1.AngularAPIHelper.mimeTypesPermitidos + "). Máximo " + AngularAPIHelper_1.AngularAPIHelper.maximoSizeByFichero + "  bytes.");
            }
        }
    };
    GestorSubidaComponent.prototype.imagenSubida = function () {
        return this.fichero.base64 != "" && this.fichero.mimeType != "" && this.fichero.base64 != undefined && this.fichero.mimeType != undefined;
    };
    GestorSubidaComponent.prototype.borrarImagen = function () {
        this.fichero.base64 = "";
        this.fichero.mimeType = "";
    };
    return GestorSubidaComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Fichero)
], GestorSubidaComponent.prototype, "fichero", void 0);
GestorSubidaComponent = __decorate([
    core_1.Component({
        selector: 'gestor-subida',
        templateUrl: './templates/gestor-subida.component.html',
        providers: [AngularAPIHelper_1.AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper_1.AngularAPIHelper, core_1.ElementRef])
], GestorSubidaComponent);
exports.GestorSubidaComponent = GestorSubidaComponent;
//# sourceMappingURL=gestor-subida.component.js.map