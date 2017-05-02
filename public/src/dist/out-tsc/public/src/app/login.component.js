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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var AngularAPIHelper_1 = require("./utils/AngularAPIHelper");
var Utils_1 = require("../../../models/Utils");
var LocalStorageService_1 = require("./utils/LocalStorageService");
var LoginComponent = (function () {
    function LoginComponent(angularAPIHelper, localStorageService, router, fb) {
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        this.router = router;
        this.fb = fb;
        if (this.angularAPIHelper.usuarioLogeado(this.localStorageService)) {
            this.router.navigate(['/']);
        }
        this.formLogin = this.fb.group({
            'nombreUsuario': [null, forms_1.Validators.required],
            'pass': [null, forms_1.Validators.required]
        });
        this.peticion = new Utils_1.PeticionLogin();
    }
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        var hashedPass = Utils_1.Utils.firmarTexto(this.peticion.pass);
        var peticionHasheada = new Utils_1.PeticionLogin(this.peticion.nombreUsuario, hashedPass);
        this.angularAPIHelper.postEntryOrFilter('usuario/login', JSON.stringify(peticionHasheada)).subscribe(function (response) {
            var respuesta = response;
            if (respuesta.estado == AngularAPIHelper_1.ResponseStatus.OK) {
                var respuestaLogin = respuesta.login;
                console.log(respuestaLogin);
                _this.localStorageService.setPropiedad('usuarioLogeado', respuestaLogin.usuarioLogeado);
                _this.localStorageService.setPropiedad('tokenUsuario', respuestaLogin.tokenUsuario);
                _this.localStorageService.setPropiedad('usuarioLogeadoNombre', respuestaLogin.nombreUsuario);
                _this.router.navigate(['/']);
            }
            else {
                _this.error = true;
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "login",
        templateUrl: "./templates/login.component.html",
        providers: [AngularAPIHelper_1.AngularAPIHelper, LocalStorageService_1.LocalStorageService]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper_1.AngularAPIHelper, LocalStorageService_1.LocalStorageService, router_1.Router, forms_1.FormBuilder])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map