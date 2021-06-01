import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../users/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];
  constructor(public http: HttpClient) {
    this.cargarStorage();
   }

  getEmpresas(): Observable<any> {
    let url = URL_SERVICIOS + '/empresas';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getEmpresasXUsuario(userId: string): Observable<any> {
    let url = URL_SERVICIOS + '/empresas/user/' + userId;
    url += '?token=' + this.token;
    // return this.http.get(url)
    //   .pipe(map((resp: any) => resp.user));
    return this.http.get(url);
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }
}
