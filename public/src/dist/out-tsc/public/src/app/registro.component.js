var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { AngularAPIHelper, ResponseStatus } from "./utils/AngularAPIHelper";
import { Utils } from "../../../models/Utils";
import { UsuarioModel } from "./usuarios/models/UsuarioModel";
import { BotonesGuardado, TipoOperacionGuardado } from "./utils/botones-guardado.component";
let RegistroComponent = class RegistroComponent {
    constructor(angularAPIHelper, router, fb) {
        this.angularAPIHelper = angularAPIHelper;
        this.router = router;
        this.fb = fb;
        this.usuario = new UsuarioModel();
        this.oBotonesGuardado = new BotonesGuardado();
        this.oBotonesGuardado.mostrarSoloVolver();
        this.formRegistro = this.fb.group({
            'nombre': [null, Validators.required],
            'apellidos': [null, Validators.required],
            'nombreUsuario': [null, Validators.required],
            'email': [null, Validators.required],
            'pass': [null, Validators.required],
            'passConfirm': [null, Validators.required]
        });
    }
    guardarCambios() {
        if (this.usuario.pass === this.passConfirm) {
            this.usuario.pass = Utils.firmarTexto(this.usuario.pass);
            this.angularAPIHelper.postEntryOrFilter('usuario', JSON.stringify(this.usuario)).subscribe(response => {
                let respuesta = response;
                if (respuesta.estado == ResponseStatus.OK) {
                    this.usuarioGuardado = true;
                }
                else {
                    this.errorAlGuardarUsuario = true;
                    this.mensajeError = respuesta.error.toString();
                }
            });
        }
        else {
            this.errorAlGuardarUsuario = true;
            this.mensajeError = "Las contraseñas introducidas no coinciden";
        }
    }
    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Volver) {
            this.router.navigate(['/']);
        }
    }
};
RegistroComponent = __decorate([
    Component({
        selector: "registro",
        templateUrl: "./templates/registro.component.html",
        providers: [AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper, Router, FormBuilder])
], RegistroComponent);
export { RegistroComponent };
//# sourceMappingURL=registro.component.js.map