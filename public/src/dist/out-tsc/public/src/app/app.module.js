var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EscenasModule } from './escenas/escenas.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { UtilsModule } from './utils/utils.module';
import { BibliaModule } from './biblia/biblia.module';
import { AppRoutingModule } from './app-routing.module';
import { AngularAPIHelper } from './utils/AngularAPIHelper';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pageNotFound.component';
import { IndexComponent } from './index.component';
import { LoginComponent } from './login.component';
import { RegistroComponent } from './registro.component';
export function cargarConfiguracion(api) {
    return () => api.cargarConfiguracion();
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [AppComponent, PageNotFoundComponent, IndexComponent, LoginComponent, RegistroComponent],
        imports: [
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            HttpModule,
            EscenasModule,
            ProyectosModule,
            UtilsModule,
            BibliaModule,
            AppRoutingModule
        ],
        bootstrap: [AppComponent],
        providers: [AngularAPIHelper,
            {
                provide: APP_INITIALIZER,
                useFactory: cargarConfiguracion,
                deps: [AngularAPIHelper],
                multi: true
            }]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map