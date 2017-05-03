import { Component } from "@angular/core";
import { PlantillaModel } from "./models/PlantillasModel";
import { AngularAPIHelper } from "../utils/AngularAPIHelper";
import { ListaGenerica } from "../utils/lista-generica.component";
import { LocalStorageService } from "../utils/LocalStorageService";

@Component({
    selector: 'lista-plantillas',
    templateUrl: './templates/plantillas-lista.component.html',
    providers: [AngularAPIHelper]
})
export class PlantillasListComponent {
    listaGenerica: ListaGenerica;

    constructor(private angularAPIHelper: AngularAPIHelper, private localStorageService: LocalStorageService) {
        let nuevaPlantilla = new PlantillaModel();
        nuevaPlantilla.autor = this.localStorageService.getPropiedad('usuarioLogeado');
        this.listaGenerica = new ListaGenerica("Listado de plantillas disponibles para este usuario",
            "plantilla",
            "plantillasPorFiltro",
            this.angularAPIHelper.buildPeticion({}, {}),
            nuevaPlantilla,
            '',
            "porDefecto");
    }
}