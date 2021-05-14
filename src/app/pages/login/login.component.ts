import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'app/pages/users/usuario';
import { UsuarioService } from '../users/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  urlWithoutLogin: string;
  constructor(public router: Router, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    if (localStorage.getItem('urlMain')) {
      this.urlWithoutLogin = localStorage.getItem('urlMain');
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // tslint:disable-next-line:prefer-const
    let usuario = new Usuario(null, form.value.email, form.value.password);
    this.usuarioService.login(usuario, form.value.recuerdame, this.urlWithoutLogin)
      .subscribe(correcto => {
        if (localStorage.getItem('urlMain')) {
          window.location.href = localStorage.getItem('urlMain');
          localStorage.removeItem('urlMain');
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
  }

}
