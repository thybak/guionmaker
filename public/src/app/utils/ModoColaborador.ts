import { ProyectoModel } from "../proyectos/models/ProyectosModel";
import { AngularAPIHelper, ResponseStatus, RespuestaJson } from "./AngularAPIHelper";
import { LocalStorageService } from "./LocalStorageService";

export class ModoColaborador {
    usuarioLogeadoAutor: boolean;

    constructor(public angularAPIHelper: AngularAPIHelper, public localStorageService: LocalStorageService, forceValue: boolean = false) {
        if (!forceValue) {
            ProyectoModel.getProyectoActual(this.angularAPIHelper, this.localStorageService).subscribe((respuesta) => {
                let proyectoR = respuesta as RespuestaJson;
                if (proyectoR != undefined && proyectoR.estado == ResponseStatus.OK && proyectoR.consulta.length == 1) {
                    this.usuarioLogeadoAutor = this.localStorageService.esUsuarioLogeado((proyectoR.consulta[0] as ProyectoModel).autor);
                }
            });
        }
    }
}