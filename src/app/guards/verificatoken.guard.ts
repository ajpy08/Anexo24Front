import { Injectable } from '@angular/core';
import { UsuarioService } from '../pages/users/usuario.service';
// import { Router } from '@angular/router';
import { CanActivateChild, Router } from '@angular/router';
// import * as io from 'socket.io-client';
// import { PARAM_SOCKET, URL_SOCKET_IO } from 'environments/environment';

declare var swal: any;

@Injectable()
export class VerificaTokenGuard implements CanActivateChild {
  // socket = io(URL_SOCKET_IO, PARAM_SOCKET );
  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  canActivateChild(): Promise<boolean> | boolean {
    // console.log('Token guard');
    const token = this.usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expirado = this.expirado(payload.exp);

    if (expirado) {
      console.log('Token expirado');
      if (this.usuarioService.usuario) {
        this.logout();
        // this.router.navigate(['/login']);
      }
      location.reload(true);
      return false;
    } else {
      return this.verificaRenueva(payload.exp);
    }
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const tokenExp = new Date(fechaExp * 1000);

      const ahora = new Date();

      // ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));

      // console.log( tokenExp );
      // console.log( ahora );

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renuevaToken()
          .subscribe(() => {
            resolve(true);
          }, () => {
            location.reload(true);
            reject(false);
          });
      }
    });
  }

  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.usuarioService.logout();
    // this.usuarioService.updateStatusUser(this.usuarioService.usuario).subscribe((usuario) => {
    //   this.usuarioService.logout();
    //   // this.socket.emit('logout-user', usuario);
    // });
  }
}
