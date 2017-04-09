import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularAPIHelper, RespuestaJson, ResponseStatus } from "./utils/AngularAPIHelper";
import { Utils, PeticionLogin, RespuestaLogin } from "../../../models/Utils";
import { LocalStorageService } from "./utils/LocalStorageService";

@Component({
    selector: "login",
    templateUrl: "./templates/login.component.html",
    providers: [AngularAPIHelper, LocalStorageService]
})
export class LoginComponent {
    peticion: PeticionLogin;
    formLogin: FormGroup;
    error: boolean;

    constructor(private angularAPIHelper: AngularAPIHelper, private localStorageService: LocalStorageService, private router: Router, private fb : FormBuilder) {
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
            let respuesta = response as RespuestaJson;
            if (respuesta.estado == ResponseStatus.OK) {
                let respuestaLogin = respuesta.login as RespuestaLogin;
                this.localStorageService.setPropiedad('usuarioLogeado', respuestaLogin.usuarioLogeado);
                this.localStorageService.setPropiedad('tokenUsuario', respuestaLogin.tokenUsuario);
                this.router.navigate(['/']);
            } else {
                this.error = true;
            }
        });
    }
}