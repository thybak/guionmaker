import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularAPIHelper, RespuestaJson, ResponseStatus } from "./utils/AngularAPIHelper";
import { Utils } from "../../../models/Utils";
import { UsuarioModel } from "./usuarios/models/UsuarioModel";
import { BotonesGuardado, TipoOperacionGuardado } from "./utils/botones-guardado.component";

@Component({
    selector: "registro",
    templateUrl: "./templates/registro.component.html",
    providers: [AngularAPIHelper]
})
export class RegistroComponent {
    usuario: UsuarioModel;
    passConfirm: string;
    usuarioGuardado: boolean;
    passesNoCoinciden: boolean;
    errorAlGuardarUsuario: boolean;
    mensajeError: string;
    oBotonesGuardado: BotonesGuardado;
    formRegistro: FormGroup;

    constructor(private angularAPIHelper: AngularAPIHelper, private router: Router, private fb : FormBuilder) {
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
                let respuesta = response as RespuestaJson;
                if (respuesta.estado == ResponseStatus.OK) {
                    this.usuarioGuardado = true;
                } else {
                    this.errorAlGuardarUsuario = true;
                    this.mensajeError = respuesta.error.toString();
                }
            });
        } else {
            this.errorAlGuardarUsuario = true;
            this.mensajeError = "Las contraseñas introducidas no coinciden";
        }
    }

    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Volver) {
            this.router.navigate(['/']);
        }
    }


}