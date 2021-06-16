import { UsuarioService } from './../users/usuario.service';
import { HttpClient } from '@angular/common/http';
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
  empresa: Empresa;
  token: string;
  menu: any[] = [];
  constructor(
    public http: HttpClient,
    public notificationsService: NotificationsService,
    private usuarioService: UsuarioService
    ) {}

  getEmpresas(act: boolean): Observable<any> {
    let url = URL_SERVICIOS + '/empresas/' + act;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url);
  }

  getEmpresa(id: string): Observable<any> {
    let url = URL_SERVICIOS + '/empresas/empresa/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.empresa));
  }

  getEmpresasXUsuario(empresaId: string): Observable<any> {
    let url = URL_SERVICIOS + '/empresas/user/' + empresaId;
    url += '?token=' + this.usuarioService.token;
    // return this.http.get(url)
    //   .pipe(map((resp: any) => resp.user));
    return this.http.get(url);
  }

  guardarEmpresa(empresa: Empresa): Observable<any> {
    if (empresa.empresaId) {// actualizando
      return this.actualizarEmpresa(empresa);
    } else {// creando
      return (this.altaEmpresa(empresa));
    }
  }

  altaEmpresa(empresa: Empresa): Observable<any> {
    let url = URL_SERVICIOS + '/empresas';
    url += '?token=' + this.usuarioService.token;
    return this.http.post(url, empresa)
      .pipe(map((resp: any) => {
        this.notificationsService.showNotification(typeNotification.SUCCESS, `Empresa ${empresa.nombre} creado`);
        return resp.empresa;
      }));
  }

  actualizarEmpresa(empresa: Empresa) {
    let url = URL_SERVICIOS + '/empresas/' + empresa.empresaId;
    url += '?token=' + this.usuarioService.token;
    return this.http.put(url, empresa)
      .pipe(map((resp: any) => {
        this.notificationsService.showNotification(typeNotification.SUCCESS, `Empresa ${empresa.nombre} actualizado`);
        return true;
      }));
  }

  habilitaDeshabilitaEmpresa(empresa: Empresa, status: boolean): Observable<any> {
    let url = URL_SERVICIOS + '/empresas/delete/' + empresa.empresaId;
    url += '?token=' + this.usuarioService.token;
    return this.http.put(url, { activo: status }).pipe(map((resp: any) => {
      const statusDesc = status ? 'activado' : 'desactivado';
      this.notificationsService.showNotification(typeNotification.SUCCESS, `Empresa ${empresa.nombre} ${statusDesc}`);
      return true;
    }));
  }
}
