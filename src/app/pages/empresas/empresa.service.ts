import { GeneralService } from './../../shared/services/general.service';
import { UsuarioService } from './../users/usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { typeNotification } from 'app/config/config';
import { URL_SERVICIOS } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';
import { Empresa } from './empresa.model';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  // empresa: Empresa;
  // token: string;
  // menu: any[] = [];
  constructor(
    public http: HttpClient,
    public notificationsService: NotificationsService,
    private usuarioService: UsuarioService,
    private generalService: GeneralService
  ) { }

  getEmpresas(activo: boolean): Observable<any> {
    const url = URL_SERVICIOS + '/empresas/' + activo;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.get(url, options);
  }

  getEmpresa(id: string): Observable<any> {
    const url = URL_SERVICIOS + '/empresas/empresa/' + id;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.get(url, options)
      .pipe(map((resp: any) => resp.empresa));
  }

  getEmpresasXUsuario(empresaId: string): Observable<any> {
    const url = URL_SERVICIOS + '/empresas/user/' + empresaId;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.get(url, options);
  }

  guardarEmpresa(empresa: Empresa): Observable<any> {
    if (empresa.empresaId) {// actualizando
      return this.actualizarEmpresa(empresa);
    } else {// creando
      return (this.altaEmpresa(empresa));
    }
  }

  altaEmpresa(empresa: Empresa): Observable<any> {
    const url = URL_SERVICIOS + '/empresas';
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.post(url, empresa, options)
      .pipe(map((resp: any) => {
        this.notificationsService.showNotification(typeNotification.SUCCESS, `Empresa ${empresa.nombre} creado`);
        return resp.empresa;
      }));
  }

  actualizarEmpresa(empresa: Empresa): Observable<any> {
    const url = URL_SERVICIOS + '/empresas/' + empresa.empresaId;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.put(url, empresa, options)
      .pipe(map((resp: any) => {
        this.notificationsService.showNotification(typeNotification.SUCCESS, `Empresa ${empresa.nombre} actualizado`);
        // return true;
        return resp.empresa;
      }));
  }

  habilitaDeshabilitaEmpresa(empresa: Empresa, status: boolean): Observable<any> {
    const url = URL_SERVICIOS + '/empresas/' + empresa.empresaId;
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    options['body'] = { activo: status }

    return this.http.delete(url, options).pipe(map((resp: any) => {
      const statusDesc = status ? 'activado' : 'desactivado';
      this.notificationsService.showNotification(typeNotification.SUCCESS, `Empresa ${empresa.nombre} ${statusDesc}`);
      return true;
    }));
  }

  getEntidades(): Observable<any> {
    const url = URL_SERVICIOS + '/entidades/';
    const options = this.generalService.getOptionHeader(this.usuarioService.token);
    return this.http.get(url, options);
  }
}
