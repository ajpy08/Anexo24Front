import { Direccion } from './../../models/direccion.model';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from './empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  regForm: FormGroup;
  listaDirecciones: Direccion[] = [];
  url: string;

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.cargarEmpresa(id);
    } else {
      this.createdAt.disable();
      // cargaras direcciones
      // this.empresaService.getEmpresas(true).subscribe(empresas => this.listaEmpresas = empresas.empresas);
    }
    this.url = '/empresas';
  }

  createFormGroup() {
    this.regForm = this.fb.group({
      rfc: ['', [Validators.required, Validators.minLength(12)]],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      immex: ['', [Validators.required]],
      estado: [true],
      createdAt: [moment()],
      empresaId: [''],
      // direcciones: ['', [Validators.required]],
    });
  }

  cargarEmpresa(id: string) {
    this.empresaService.getEmpresa(id).subscribe(empresa => {

      // consultaras direcciones
      // this.empresaService.getEmpresas(true).subscribe(empresas => this.listaEmpresas = empresas.empresas);
      this.rfc.setValue(empresa.rfc);
      this.nombre.setValue(empresa.nombre);
      this.immex.setValue(empresa.immex);
      this.estado.setValue(empresa.estado);
      this.createdAt.disable();
      this.createdAt.setValue(empresa.createdAt);
      this.empresaId.setValue(empresa.empresaId);

      // revisaras propias direcciones
      // this.empresaService.getEmpresasXUsuario(id).subscribe((empresas) => {
      //   this.empresas.setValue(empresas.empresas);
      // });

    });
  }

  guardarEmpresa() {
    if (this.regForm.valid) {
      this.empresaService.guardarEmpresa(this.regForm.value)
        .subscribe(empresa => {
          if (this.regForm.get('empresaId').value === '' || this.regForm.get('empresaId').value === undefined) {
            this.regForm.get('empresaId').setValue(empresa.empresaId);
            this.router.navigate(['/empresas/', this.regForm.get('empresaId').value]);
          }
          this.regForm.markAsPristine();
        });
    }
  }

  /* #region  Propiedades */
  get rfc() {
    return this.regForm.get('rfc');
  }
  get nombre() {
    return this.regForm.get('nombre');
  }
  get immex() {
    return this.regForm.get('immex');
  }
  get estado() {
    return this.regForm.get('estado');
  }
  get createdAt() {
    return this.regForm.get('createdAt');
  }
  get empresaId() {
    return this.regForm.get('empresaId');
  }
  // get direcciones() {
  //   return this.regForm.get('direcciones');
  // }

  /* #endregion */

}
