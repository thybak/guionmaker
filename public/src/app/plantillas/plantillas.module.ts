import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { PlantillasRoutingModule } from './plantillas-routing.module';

import { PlantillasListComponent } from './plantillas-lista.component';
//import { DetalleEscenaComponent } from './escena-detalle.component';

@NgModule({
    imports: [CommonModule, FormsModule, UtilsModule, PlantillasRoutingModule],
    declarations: [PlantillasListComponent],
    providers: [],
    exports: []
})
export class PlantillasModule { }