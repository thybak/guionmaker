import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularAPIHelper } from './AngularAPIHelper';
import { LocalStorageService } from './LocalStorageService';

@Injectable()
export class CanActivateIsLoggedGuard implements CanActivate {

    constructor(private angularAPIHelper: AngularAPIHelper, private localStorageService: LocalStorageService, private router: Router) {
    }

    canActivate() {
        let logeado = this.angularAPIHelper.usuarioLogeado(this.localStorageService);
        if (!logeado) {
            this.router.navigate(['/login']);
        }
        return logeado;
    }

}