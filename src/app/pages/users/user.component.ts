import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2'

@Component({
    selector: 'app-user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    regForm: FormGroup;
    // listaEmpresas: Empresa[] = [];
    url: string;

    constructor(
        private usuarioService: UsuarioService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.createFormGroup();
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id !== 'nuevo') {
            this.cargarUsuario(id);
        }
        this.url = '/usuarios';
    }

    createFormGroup() {
        this.regForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            passwordConfirm: ['', [ Validators.required, this.match('password')]],
            estado: [''],
            createdAt: [''],
            userId: [''],
            // role: ['', [Validators.required]],
            // empresas: [''],
            // permiso: [''],
            // observaciones: [''],
            // img: [''],
        });
    }

    match(controlKey: string) {
        return (control: AbstractControl): { [s: string]: boolean } => {
            // control.parent es el FormGroup
            if (this.regForm) { // en las primeras llamadas control.parent es undefined
                const checkValue = this.regForm.controls[controlKey].value;
                if (control.value !== checkValue) {
                    return {
                        match: true
                    };
                }
            }
            return null;
        };
    }

    cargarUsuario(id: string) {
        this.usuarioService.getUsuario(id).subscribe(usuario => {
            // this._clienteService.getClientesRole(usuario.role).subscribe(empresas => this.listaEmpresas = empresas);
            this.nombre.setValue(usuario.nombre);
            this.email.setValue(usuario.email);
            // this.password.setValue(usuario.password);
            // this.passwordConfirm.setValue(usuario.password);
            this.password.disable();
            this.passwordConfirm.disable();
            this.estado.setValue(usuario.estado);
            this.createdAt.setValue(usuario.createdAt);
            this.userId.setValue(usuario.userId);
            // this.role.setValue(usuario.role);
            // this.role.disable();
            // this.empresas.setValue(usuario.empresas);
            // this.observaciones.setValue(usuario.observaciones);
            // this.img.setValue(usuario.img);
            // this.permiso.setValue(usuario.permiso);

        });
    }

    guardarUsuario() {
        if (this.regForm.valid) {
            this.usuarioService.guardarUsuario(this.regForm.value)
                .subscribe(usuario => {
                    // this.fileFoto = null;
                    // this.fotoTemporal = false;
                    if (this.regForm.get('userId').value === '' || this.regForm.get('userId').value === undefined) {
                        this.regForm.get('userId').setValue(usuario.userId);
                        this.password.disable();
                        this.passwordConfirm.disable();
                        // this.role.disable();
                        this.router.navigate(['/usuarios/usuario', this.regForm.get('userId').value]);
                    }
                    this.regForm.markAsPristine();
                });
        }
    }

    habilitaDeshabilitaUsuario(event) {
        if (this.userId.value === this.usuarioService.usuario.userId) {
          swal.fire(
            {
                title: 'Error!',
                text: 'No se puede habilitar / deshabilitar a si mismo',
                icon: 'error'
              }
          );
          return;
        }

        swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
              swal.fire(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success'
              )
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === swal.DismissReason.cancel) {
              swal.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })

        // swal.fire({
        //   title: "¿Esta seguro?",
        //   text: "Esta apunto de deshabilitar a " + usuario.nombre,
        //   icon: "warning",
        //   buttons: true,
        //   dangerMode: true
        // }).then(borrar => {
        //   if (borrar) {
        //     this._usuarioService
        //       .habilitaDeshabilitaUsuario(usuario, event.checked)
        //       .subscribe(borrado => {
        //         this.cargarUsuarios();
        //       });
        //   } else {
        //     event.source.checked = !event.checked;
        //   }
        // });
      }

    /* #region  Propiedades */
    get nombre() {
        return this.regForm.get('nombre');
    }
    get email() {
        return this.regForm.get('email');
    }
    get password() {
        return this.regForm.get('password');
    }
    get passwordConfirm() {
        return this.regForm.get('passwordConfirm');
    }

    get estado() {
        return this.regForm.get('estado');
    }

    get createdAt() {
        return this.regForm.get('createdAt');
    }

    get userId() {
        return this.regForm.get('userId');
    }

    // get img() {
    //     return this.regForm.get('img');
    // }
    // get role() {
    //     return this.regForm.get('role');
    // }

    // get permiso() {
    //     return this.regForm.get('permiso');
    // }
    // get empresas() {
    //     return this.regForm.get('empresas');
    // }

    // get observaciones() {
    //     return this.regForm.get('observaciones');
    // }

    /* #endregion */
}
