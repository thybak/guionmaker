import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EscenasModule } from './escenas/escenas.module';
import { UtilsModule } from './utils/utils.module';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [ AppComponent ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        EscenasModule,
        UtilsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
