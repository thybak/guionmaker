import { Component } from "@angular/core";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    templateUrl: './templates/ayuda-diccionarios.component.html',
    selector: 'ayuda-diccionarios'
})
export class AyudaDiccionariosComponent {
    palabraAcepcion: string;
    palabraSinonimo: string;
    iniURLRAE: string = "http://dle.rae.es/srv/search?w={0}&m=10";
    iniURLWR: string = "http://www.wordreference.com/sinonimos/{0}";
    urlRAE: SafeUrl;
    urlWR: SafeUrl;

    constructor(private domSanitizer: DomSanitizer) { }

    cambiarURLAcepciones() {
        this.urlRAE = this.domSanitizer.bypassSecurityTrustResourceUrl(this.iniURLRAE.replace("{0}", this.palabraAcepcion));
    }

    cambiarURLSinonimos() {
        this.urlWR = this.domSanitizer.bypassSecurityTrustResourceUrl(this.iniURLWR.replace("{0}", this.palabraSinonimo));
    }
}