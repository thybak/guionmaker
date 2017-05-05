import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './pageNotFound.component';
import { AppComponent } from './app.component';
import { IndexComponent } from './index.component';
import { LoginComponent } from './login.component';
import { RegistroComponent } from './registro.component';
import { CanActivateIsLoggedGuard } from './utils/CanActivateIsLoggedGuard';

const appRoutes: Routes =
    [
        { path: '', component: IndexComponent, canActivate: [CanActivateIsLoggedGuard] },
        { path: 'login', component: LoginComponent },
        { path: 'registro', component: RegistroComponent },
        { path: '**', component: PageNotFoundComponent }
    ]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}