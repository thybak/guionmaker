import { Http, Response } from '@angular/http';
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

    constructor(private domSanitizer: DomSanitizer, private http: Http) { }

    cambiarURLAcepciones() {
        window.open(this.iniURLRAE.replace("{0}", this.palabraAcepcion));
    }

    cambiarURLSinonimos() {
        window.open(this.iniURLWR.replace("{0}", this.palabraSinonimo));
    }
}