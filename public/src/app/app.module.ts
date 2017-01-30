import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EscenasModule } from './escenas/escenas.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { UtilsModule } from './utils/utils.module';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pageNotFound.component';
import { IndexComponent } from './index.component';

@NgModule({
    declarations: [ AppComponent, PageNotFoundComponent, IndexComponent ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        EscenasModule,
        ProyectosModule,
        UtilsModule,
        AppRoutingModule    
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
