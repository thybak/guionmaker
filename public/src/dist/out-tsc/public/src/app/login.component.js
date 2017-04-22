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
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularAPIHelper, ResponseStatus } from "./utils/AngularAPIHelper";
import { Utils, PeticionLogin } from "../../../models/Utils";
import { LocalStorageService } from "./utils/LocalStorageService";
let LoginComponent = class LoginComponent {
    constructor(angularAPIHelper, localStorageService, router, fb) {
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        this.router = router;
        this.fb = fb;
        if (this.angularAPIHelper.usuarioLogeado(this.localStorageService)) {
            this.router.navigate(['/']);
        }
        this.formLogin = this.fb.group({
            'nombreUsuario': [null, Validators.required],
            'pass': [null, Validators.required]
        });
        this.peticion = new PeticionLogin();
    }
    onLogin() {
        let hashedPass = Utils.firmarTexto(this.peticion.pass);
        let peticionHasheada = new PeticionLogin(this.peticion.nombreUsuario, hashedPass);
        this.angularAPIHelper.postEntryOrFilter('usuario/login', JSON.stringify(peticionHasheada)).subscribe(response => {
            let respuesta = response;
            if (respuesta.estado == ResponseStatus.OK) {
                let respuestaLogin = respuesta.login;
                this.localStorageService.setPropiedad('usuarioLogeado', respuestaLogin.usuarioLogeado);
                this.localStorageService.setPropiedad('tokenUsuario', respuestaLogin.tokenUsuario);
                this.router.navigate(['/']);
            }
            else {
                this.error = true;
            }
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: "login",
        templateUrl: "./templates/login.component.html",
        providers: [AngularAPIHelper, LocalStorageService]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper, LocalStorageService, Router, FormBuilder])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map