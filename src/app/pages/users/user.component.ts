import { EmpresaService } from './../empresas/empresa.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2'
import { Empresa } from '../empresas/empresa.model';
import * as _moment from 'moment';
const moment = _moment;

@Component({
    selector: 'app-user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    regForm: FormGroup;
    listaEmpresas: Empresa[] = [];
    url: string;

    constructor(
        private usuarioService: UsuarioService,
        private empresaService: EmpresaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.createFormGroup();
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id !== 'nuevo') {
            this.cargarUsuario(id);
        } else {
            this.createdAt.disable();
            this.empresaService.getEmpresas(true).subscribe(empresas => this.listaEmpresas = empresas.empresas);
        }
        this.url = '/usuarios';
    }

    createFormGroup() {
        this.regForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            passwordConfirm: ['', [Validators.required, this.match('password')]],
            estado: [true],
            createdAt: [moment()],
            userId: [''],
            // role: ['', [Validators.required]],
            empresas: ['', [Validators.required]],
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
            this.empresaService.getEmpresas(true).subscribe(empresas => this.listaEmpresas = empresas.empresas);
            this.nombre.setValue(usuario.nombre);
            this.email.setValue(usuario.email);
            // this.password.setValue(usuario.password);
            // this.passwordConfirm.setValue(usuario.password);
            this.password.disable();
            this.passwordConfirm.disable();
            this.createdAt.disable();
            this.estado.setValue(usuario.estado);
            this.createdAt.setValue(usuario.createdAt);
            this.userId.setValue(usuario.userId);
            // this.role.setValue(usuario.role);
            // this.role.disable();
            this.empresaService.getEmpresasXUsuario(id).subscribe((empresas) => {
                this.empresas.setValue(empresas.empresas);
            });
            // this.observaciones.setValue(usuario.observaciones);
            // this.img.setValue(usuario.img);
            // this.permiso.setValue(usuario.permiso);

        });
    }

    guardarUsuario() {
        if (this.regForm.valid) {
            this.usuarioService.guardarUsuario(this.regForm.value)
                .subscribe(user => {
                    // this.fileFoto = null;
                    // this.fotoTemporal = false;
                    if (this.regForm.get('userId').value === '' || this.regForm.get('userId').value === undefined) {
                        this.regForm.get('userId').setValue(user.userId);
                        this.password.disable();
                        this.passwordConfirm.disable();
                        // this.role.disable();
                        this.router.navigate(['/users/user', this.regForm.get('userId').value]);
                    }
                    this.regForm.markAsPristine();
                });
        }
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
    get empresas() {
        return this.regForm.get('empresas');
    }

    // get observaciones() {
    //     return this.regForm.get('observaciones');
    // }

    /* #endregion */
}
