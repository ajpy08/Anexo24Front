import { AgenteAduanal } from './agente-aduanal.model';
import { Injectable } from '@angular/core';
import { GeneralService } from './../../shared/services/general.service';
import { NotificationsService } from './../notifications/notifications.service';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { typeNotification } from 'app/config/config';
import { UsuarioService } from '../users/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AgenteAduanalService {
  token: string;
  menu: any[] = [];
  messages: string[] = [];
  constructor(
    public http: HttpClient,
    public router: Router,
    public notificationsService: NotificationsService,
    private usuarioService: UsuarioService,
    public generalService: GeneralService
  ) { }

  getAgentesAduanales(activo: boolean): Observable<any> {
    const url = URL_SERVICIOS + '/agentesAduanales/' + activo;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.get(url, options);
  }

  getAgenteAduanal(id: string): Observable<any> {
    const url = URL_SERVICIOS + '/agentesAduanales/agente/' + id;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.get(url, options)
      .pipe(map((resp: any) => resp.agente));
  }

  guardarAgenteAduanal(agenteAduanal: AgenteAduanal): Observable<any> {
    if (agenteAduanal.agenteAduanalId) {// actualizando
      return this.actualizarAgenteAduanal(agenteAduanal);
    } else {// creando
      return (this.altaAgenteAduanal(agenteAduanal));
    }
  }

  altaAgenteAduanal(agenteAduanal: AgenteAduanal): Observable<any> {
    const url = URL_SERVICIOS + '/agentesAduanales';
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.post(url, agenteAduanal, options)
      .pipe(map((resp: any) => {
        this.notificationsService.showNotification(typeNotification.SUCCESS, `${agenteAduanal.nombre} creado`);
        return resp.agente;
      }));
  }

  actualizarAgenteAduanal(agenteAduanal: AgenteAduanal): Observable<any> {
    const url = URL_SERVICIOS + '/agentesAduanales/' + agenteAduanal.agenteAduanalId;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.put(url, agenteAduanal, options)
      .pipe(map((resp: any) => {
        this.notificationsService.showNotification(typeNotification.SUCCESS, `${agenteAduanal.nombre} actualizado`);
        // return true;
        return resp.agente;
      }));
  }

  habilitaDeshabilitaAgenteAduanal(agenteAduanal: AgenteAduanal, status: boolean): Observable<any> {
    const url = URL_SERVICIOS + '/agentesAduanales/' + agenteAduanal.agenteAduanalId;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    options['body'] = { activo: status }

    return this.http.delete(url, options).pipe(map((resp: any) => {
      const statusDesc = status ? 'activado' : 'desactivado';
      this.notificationsService.showNotification(typeNotification.SUCCESS, `AgenteAduanal ${agenteAduanal.nombre} ${statusDesc}`);
      return true;
    }));
  }
}
