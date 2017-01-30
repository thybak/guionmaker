import { Component } from '@angular/core';
import { AngularAPIHelper, RespuestaJson } from '../utils/AngularAPIHelper';

@Component({
    selector: 'detalle-proyecto',
    templateUrl: './templates/proyecto-detalle.component.html',
    providers: [AngularAPIHelper]
})
export class DetalleProyectoComponent { }