import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { LocalStorageService } from './utils/LocalStorageService';
import { AngularAPIHelper, RespuestaJson, ResponseStatus } from './utils/AngularAPIHelper';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

@Component({
    selector: 'guionMaker',
    templateUrl: './templates/app.component.html',
    providers: [LocalStorageService]
})
export class AppComponent {
    darkTheme: boolean;

    constructor(private localStorageService: LocalStorageService, private angularAPIHelper: AngularAPIHelper, private router: Router, private breadcrumbService: BreadcrumbService, @Inject(DOCUMENT) private doc) {
        this.breadcrumbService.addCallbackForRouteRegex('^(.)+$', (str) => {
            let reg = new RegExp("^.*([A-Fa-f]|[0-9]){24}$");
            if (reg.test(str)) {
                str = "Detalle";
            } else {
                str = str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
            }
            return str;
        });
    }

    cambiarTemplate() {
        this.darkTheme = !this.darkTheme;
        const baseURL: string = "assets/bootstrap/css/";
        if (this.darkTheme) {
            this.doc.getElementById('bsTheme').setAttribute("href", baseURL + "bootstrap-darkly.min.css");
        } else {
            this.doc.getElementById('bsTheme').setAttribute("href", baseURL + "bootstrap-flatly.min.css");
        }
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