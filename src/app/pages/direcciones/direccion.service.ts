import { GeneralService } from './../../shared/services/general.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { typeNotification } from 'app/config/config';
import { Direccion } from 'app/pages/direcciones/direccion.model';
import { URL_SERVICIOS } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';
import { UsuarioService } from '../users/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  constructor(
    public http: HttpClient,
    public notificationsService: NotificationsService,
    private usuarioService: UsuarioService,
    private generalService: GeneralService
  ) { }

  getDirecciones(act: boolean): Observable<any> {
    const url = URL_SERVICIOS + '/direcciones/' + act;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.get(url, options);
  }

  getDireccion(id: string): Observable<any> {
    const url = URL_SERVICIOS + '/direcciones/direccion/' + id;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.get(url, options)
      .pipe(map((resp: any) => resp.direccion));
  }

  getDireccionesXEmpresa(empresaId: string): Observable<any> {
    const url = URL_SERVICIOS + '/direcciones/direccion/empresa/' + empresaId;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.get(url, options);
  }

  guardarDireccion(direccion: Direccion): Observable<any> {
    if (direccion.direccionId) {// actualizando
      return this.actualizarDireccion(direccion);
    } else {// creando
      return (this.altaDireccion(direccion));
    }
  }

  altaDireccion(direccion: Direccion): Observable<any> {
    const url = URL_SERVICIOS + '/direcciones';
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.post(url, direccion, options)
      .pipe(map((resp: any) => {
        this.notificationsService.showNotification(typeNotification.SUCCESS, `Dirección ${direccion.calle} creada`);
        return resp.direccion;
      }));
  }

  actualizarDireccion(direccion: Direccion) {
    const url = URL_SERVICIOS + '/direcciones/' + direccion.direccionId;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.put(url, direccion, options)
      .pipe(map((resp: any) => {
        this.notificationsService.showNotification(typeNotification.SUCCESS, `Dirección ${direccion.calle} actualizada`);
        return true;
      }));
  }

  habilitaDeshabilitaDireccion(direccion: Direccion, status: boolean): Observable<any> {
    const url = URL_SERVICIOS + '/direcciones/delete/' + direccion.direccionId;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.put(url, { activo: status }, options).pipe(map((resp: any) => {
      const statusDesc = status ? 'activada' : 'desactivada';
      this.notificationsService.showNotification(typeNotification.SUCCESS, `Dirección ${direccion.calle} ${statusDesc}`);
      return true;
    }));
  }

  eliminaDireccion(direccion: Direccion): Observable<any> {
    const url = URL_SERVICIOS + '/direcciones/' + direccion.direccionId;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.delete(url, options).pipe(map((resp: any) => {
      this.notificationsService.showNotification(typeNotification.SUCCESS, `Dirección eliminada`);
    }));
  }
}
