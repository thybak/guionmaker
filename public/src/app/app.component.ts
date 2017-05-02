import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './utils/LocalStorageService';
import { AngularAPIHelper, RespuestaJson, ResponseStatus } from './utils/AngularAPIHelper';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

@Component({
    selector: 'guionMaker',
    templateUrl: './templates/app.component.html',
    providers: [LocalStorageService]
})
export class AppComponent {

    constructor(private localStorageService: LocalStorageService, private angularAPIHelper: AngularAPIHelper, private router: Router, private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.hideRouteRegex("^.*([A-Fa-f]|[0-9]){24,24}$");
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