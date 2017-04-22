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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var AngularAPIHelper_1 = require("./utils/AngularAPIHelper");
var Utils_1 = require("../../../models/Utils");
var UsuarioModel_1 = require("./usuarios/models/UsuarioModel");
var botones_guardado_component_1 = require("./utils/botones-guardado.component");
var RegistroComponent = (function () {
    function RegistroComponent(angularAPIHelper, router, fb) {
        this.angularAPIHelper = angularAPIHelper;
        this.router = router;
        this.fb = fb;
        this.usuario = new UsuarioModel_1.UsuarioModel();
        this.oBotonesGuardado = new botones_guardado_component_1.BotonesGuardado();
        this.oBotonesGuardado.mostrarSoloVolver();
        this.formRegistro = this.fb.group({
            'nombre': [null, forms_1.Validators.required],
            'apellidos': [null, forms_1.Validators.required],
            'nombreUsuario': [null, forms_1.Validators.required],
            'email': [null, forms_1.Validators.required],
            'pass': [null, forms_1.Validators.required],
            'passConfirm': [null, forms_1.Validators.required]
        });
    }
    RegistroComponent.prototype.guardarCambios = function () {
        var _this = this;
        this.usuarioGuardando = true;
        if (this.usuario.pass === this.passConfirm) {
            this.usuario.pass = Utils_1.Utils.firmarTexto(this.usuario.pass);
            this.angularAPIHelper.postEntryOrFilter('usuario', JSON.stringify(this.usuario)).subscribe(function (response) {
                var respuesta = response;
                if (respuesta.estado == AngularAPIHelper_1.ResponseStatus.OK) {
                    _this.usuarioGuardado = true;
                    _this.usuarioGuardando = false;
                }
                else {
                    _this.errorAlGuardarUsuario = true;
                    _this.mensajeError = respuesta.error.toString();
                }
            });
        }
        else {
            this.usuarioGuardando = false;
            this.errorAlGuardarUsuario = true;
            this.mensajeError = "Las contraseñas introducidas no coinciden";
        }
    };
    RegistroComponent.prototype.onAccionGuardado = function (event) {
        if (event == botones_guardado_component_1.TipoOperacionGuardado.Volver) {
            this.router.navigate(['/']);
        }
    };
    return RegistroComponent;
}());
RegistroComponent = __decorate([
    core_1.Component({
        selector: "registro",
        templateUrl: "./templates/registro.component.html",
        providers: [AngularAPIHelper_1.AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper_1.AngularAPIHelper, router_1.Router, forms_1.FormBuilder])
], RegistroComponent);
exports.RegistroComponent = RegistroComponent;
//# sourceMappingURL=registro.component.js.map