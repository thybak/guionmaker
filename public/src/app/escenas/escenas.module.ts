import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { UtilsModule } from '../utils/utils.module';
import { EscenasRoutingModule } from './escenas-routing.module';

import { EscenasListComponent } from './escenasList.component';

@NgModule({
    imports: [CommonModule, FormsModule, SortablejsModule, UtilsModule, EscenasRoutingModule],
    declarations: [EscenasListComponent],
    providers: [],
    exports: [EscenasListComponent]
})
export class EscenasModule { }