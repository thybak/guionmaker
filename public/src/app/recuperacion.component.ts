import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularAPIHelper, RespuestaJson, ResponseStatus } from "./utils/AngularAPIHelper";
import { UsuarioModel } from "./usuarios/models/UsuarioModel";
import { Utils } from "../../../models/Utils";

@Component({
    selector: "recuperacion",
    templateUrl: "./templates/recuperacion.component.html",
    providers: [AngularAPIHelper]
})
export class RecuperacionComponent {
    formInicioRecuperacion: FormGroup;
    formRestablecimientoPass: FormGroup;
    identificadorUsuario: string;
    tokenRecuperacion: string;
    pass: string;
    passConfirm: string;
    restablecimientoPass: boolean;
    errorRestablecimiento: boolean;
    passRestablecida: boolean;
    tokenRecuperacionCreado: boolean;
    usuario: UsuarioModel;


    constructor (private angularAPIHelper: AngularAPIHelper, private router: Router, private route: ActivatedRoute, private fb: FormBuilder){
        this.route.params.subscribe((params: Params) => {
            this.identificadorUsuario = params['identificadorUsuario'];
            this.tokenRecuperacion = params['tokenRecuperacion'];

            this.angularAPIHelper.getByParams('usuario/recuperar', [this.identificadorUsuario, this.tokenRecuperacion]).subscribe(response => {
                let respuesta: RespuestaJson = response as RespuestaJson;
                if (respuesta.estado == ResponseStatus.OK){
                    this.restablecimientoPass = true;
                    this.usuario = respuesta.consulta[0] as UsuarioModel;
                }
            });
        });

        this.formInicioRecuperacion = this.fb.group({
            'identificadorUsuario': [null, Validators.required]
        });
        this.formRestablecimientoPass = this.fb.group({
            'pass': [null, Validators.required],
            'passConfirm': [null, Validators.required]
        });
    }

    recuperarPass(){
        if (this.identificadorUsuario !== ''){
            this.angularAPIHelper.getByParams('usuario/recuperar', [this.identificadorUsuario]).subscribe(response => {
                this.tokenRecuperacionCreado = true;
            });
        }
    }

    restablecerPass(){
        if (this.pass === this.passConfirm){
            this.usuario.pass = Utils.firmarTexto(this.pass);
            this.usuario.tokenRecuperacion = null;
            this.usuario.fechaTokenRecuperacion = null;
            this.angularAPIHelper.postEntryOrFilter('usuario', JSON.stringify(this.usuario)).subscribe(response => {
                let respuesta: RespuestaJson = response as RespuestaJson;
                this.passRestablecida = respuesta.estado == ResponseStatus.OK;
            });
        } else {
            this.errorRestablecimiento = true;
        }
    }
}