import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './utils/LocalStorageService';
import { AngularAPIHelper } from './utils/AngularAPIHelper';

@Component({
    selector: 'guionMaker',
    templateUrl: './templates/app.component.html',
    providers: [LocalStorageService]
})
export class AppComponent {
    constructor(private localStorageService: LocalStorageService, private angularAPIHelper : AngularAPIHelper, private router: Router) {
    }

    hayProyecto() {
        return this.hayUsuario() && this.localStorageService.propiedades['proyectoActual'] != null;
    }

    hayUsuario() {
        return this.angularAPIHelper.usuarioLogeado(this.localStorageService);
    }

    cerrarSesion() {
        this.localStorageService.borrar();
        this.router.navigate(['/login']);
    }
}