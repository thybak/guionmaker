import { Component, Input } from '@angular/core';

class Escena {
    title: string = "todo ok";
}

@Component({
    selector: 'escenas-list',
    templateUrl: './templates/escenasList.component.html'
})
export class EscenasListComponent {
    escena: Escena = new Escena();

}
