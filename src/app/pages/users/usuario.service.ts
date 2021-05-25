import { NotificationsService } from './../notifications/notifications.service';
import { throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from '../../../environments/environment';
import { Router } from '@angular/router';
// import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
// import swal from 'sweetalert';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { typeNotification } from 'app/config/config';
// import * as Sentry from '@sentry/browser';

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];
  messages: string[] = [];


  constructor(
    public http: HttpClient,
    public router: Router,
    public notificationsService: NotificationsService
    // public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  renuevaToken(): Observable<any> {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token);
          // console.log('Token renovado');
          return true;
        }),
        catchError(err => {
          this.router.navigate(['/']);
          this.notificationsService.showNotification(typeNotification.ERROR, 'No se pudo renovar token ');
          // swal('No se pudo renovar token', 'No fue posible renovar token', 'error');
          return throwError(err);
        }));
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
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
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any, urlWithoutLogin: string) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    // localStorage.setItem('menu', JSON.stringify(menu));
    // localStorage.setItem('urlMain', urlWithoutLogin);

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  login(usuario: Usuario, recordar: boolean = false, urlWithoutLogin: string): Observable<any> {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    if (urlWithoutLogin === undefined) {
      // urlWithoutLogin = '/#/dashboard';
      urlWithoutLogin = '/#/dashboard';
    }
    const url = URL_SERVICIOS + '/auth/login';
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          // this.guardarStorage(resp.user.userId, resp.token, resp.user, resp.menu, urlWithoutLogin);
          this.guardarStorage(resp.user.userId, resp.token, resp.user, '', urlWithoutLogin);
          return true;
        }));
  }

  logout() {
    // Sentry.configureScope(scope => scope.setUser(null));
    this.menu = [];
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('id'); // Lo elimine no se si sirve para algo.
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    // localStorage.removeItem('history');
    // localStorage.removeItem('historyArray');
    // localStorage.removeItem('AprobSolicitudes');
    // localStorage.removeItem('ManiobrasTabs');
    // localStorage.removeItem('InventarioTabs');
    // localStorage.removeItem('AprobacionTabs');
    // localStorage.removeItem('TrasportistaTabs');
    // localStorage.removeItem('FacturacionTabs');
    // localStorage.removeItem('VacioTabs');
    // localStorage.removeItem('L/R');
    // localStorage.removeItem('TiemposTab');
    // localStorage.removeItem('LR');
    // localStorage.removeItem('prodSer');
    // localStorage.removeItem('tipoRelacion');
    // localStorage.removeItem('cfdis');
    // localStorage.removeItem('IE');
    // localStorage.removeItem('urlMain');
    // localStorage.removeItem('MantenimientossoloFinalizados');
    // localStorage.removeItem('MantenimientosfiltroFechaIni');
    // localStorage.removeItem('MantenimientosfiltroFechaFin');

    this.router.navigate(['/']);
  }

  // updateStatusUser(usuario) {
  //   // if (this.usuario) {
  //   let url = URL_SERVICIOS + '/usuarios/usuario/' + usuario.userId + '/user/logout';
  //   url += '?token=' + this.token;
  //   return this.http.put(url, usuario);
  //   // }
  // }

  getUsuarios(act: boolean): Observable<any> {
    let url = URL_SERVICIOS + '/users/' + act;
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getUsuario(id: string): Observable<any> {
    let url = URL_SERVICIOS + '/users/user/' + id;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.user));
  }

  guardarUsuario(usuario: Usuario): Observable<any> {
    if (usuario.userId) {// actualizando
      return this.actualizarUsuario(usuario);
    } else {// creando
      return (this.altaUsuario(usuario));
    }
  }

  altaUsuario(usuario: Usuario): Observable<any> {
    let url = URL_SERVICIOS + '/users';
    url += '?token=' + this.token;
    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        this.notificationsService.showNotification(typeNotification.INFO, `Usuario ${usuario.nombre} creado`);
        // swal('Usuario creado', usuario.email, 'success');
        return resp.user;
      }));
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/users/' + usuario.userId;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
      .pipe(map((resp: any) => {
        if (usuario.userId === this.usuario.userId) {
          const usuarioDB: Usuario = resp.user;
          this.guardarStorage(usuarioDB.userId, this.token, usuarioDB, this.menu, undefined);
        }
        this.notificationsService.showNotification(typeNotification.INFO, `Usuario ${usuario.nombre} actualizado`);
        // swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }));
  }

  habilitaDeshabilitaUsuario(usuario: Usuario, status: boolean): Observable<any> {
    let url = URL_SERVICIOS + '/users/delete/' + usuario.userId;
    url += '?token=' + this.token;
    return this.http.put(url, { activo: status }).pipe(map((resp: any) => {
      const statusDesc = status ? 'activado' : 'desactivado';
      this.notificationsService.showNotification(typeNotification.INFO, `Usuario ${usuario.nombre} ${statusDesc}`);
      return true;
    }));
  }
}
