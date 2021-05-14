import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../pages/users/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService, public router: Router) {}
  canActivate() {

    if (this.usuarioService.estaLogueado()) {
      // console.log('Paso por el Guard');
      return true;
    } else {
      console.log('Bloqueado por Guard');
      // if (this.usuarioService.usuario && this.usuarioService.usuario.estado) {
      //   this.usuarioService.updateStatusUser(this.usuarioService.usuario).subscribe(() => {});
      // }
      this.router.navigate(['/login']);
      return false;
    }
  }
}
