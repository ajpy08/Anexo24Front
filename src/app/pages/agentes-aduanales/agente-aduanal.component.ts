import { AgenteAduanalService } from './agente-aduanal.service';
import { EmpresaService } from './../empresas/empresa.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2'
import { Empresa } from '../empresas/empresa.model';
import * as _moment from 'moment';
import { UsuarioService } from '../users/usuario.service';
const moment = _moment;

@Component({
  selector: 'app-agente-aduanal',
  templateUrl: './agente-aduanal.component.html',
  styleUrls: ['./agente-aduanal.component.css']
})
export class AgenteAduanalComponent implements OnInit {
  regForm: FormGroup;
  url: string;
  entidades: [];

  constructor(
    private agenteAduanalService: AgenteAduanalService,
    private empresaService: EmpresaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.cargarAgenteAduanal(id);
    } else {
      this.createdAt.disable();
      this.userAltaId.setValue(this.usuarioService.usuario.userId);
    }
    this.empresaService.getEntidades().subscribe(entidades => this.entidades = entidades.entidades);
    this.url = '/agentesAduanales';
  }

  createFormGroup() {
    this.regForm = this.fb.group({
      patente: ['', [Validators.required, Validators.minLength(4)]],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      rfc: ['', [Validators.required, Validators.minLength(12)]],
      curp: [''],
      calle: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      // domicilioFiscal: [true],
      // tipo: [''],
      estado: [true],
      userAltaId: [''],
      createdAt: [moment()],
      agenteAduanalId: [''],
      entidadId: [''],
    });
  }

  cargarAgenteAduanal(id: string) {
    this.agenteAduanalService.getAgenteAduanal(id).subscribe(agenteAduanal => {
      this.patente.setValue(agenteAduanal.patente);
      this.nombre.setValue(agenteAduanal.nombre);
      this.rfc.setValue(agenteAduanal.rfc);
      this.curp.setValue(agenteAduanal.curp);
      this.calle.setValue(agenteAduanal.calle);
      this.numero.setValue(agenteAduanal.numero);
      this.cp.setValue(agenteAduanal.cp);
      this.colonia.setValue(agenteAduanal.colonia);
      // this.domicilioFiscal.setValue(agenteAduanal.domicilioFiscal);
      // this.tipo.setValue(agenteAduanal.tipo);
      this.estado.setValue(agenteAduanal.estado);
      this.userAltaId.setValue(this.usuarioService.usuario.userId);
      this.createdAt.disable();
      this.createdAt.setValue(agenteAduanal.createdAt);
      this.agenteAduanalId.setValue(agenteAduanal.agenteAduanalId);
      this.entidadId.setValue(agenteAduanal.entidadId);
    });
  }

  guardarAgenteAduanal() {
    if (this.regForm.valid) {
      this.agenteAduanalService.guardarAgenteAduanal(this.regForm.value)
        .subscribe(agenteAduanal => {
          if (this.regForm.get('agenteAduanalId').value === '' || this.regForm.get('agenteAduanalId').value === undefined) {
            this.regForm.get('agenteAduanalId').setValue(agenteAduanal.agenteAduanalId);
            this.router.navigate(['/agentesAduanales/', this.regForm.get('agenteAduanalId').value]);
          }
          this.regForm.markAsPristine();
        });
    }
  }

  /* #region  Propiedades */
  get patente() {
    return this.regForm.get('patente');
  }
  get nombre() {
    return this.regForm.get('nombre');
  }
  get rfc() {
    return this.regForm.get('rfc');
  }
  get curp() {
    return this.regForm.get('curp');
  }
  get calle() {
    return this.regForm.get('calle');
  }
  get numero() {
    return this.regForm.get('numero');
  }
  get cp() {
    return this.regForm.get('cp');
  }
  get colonia() {
    return this.regForm.get('colonia');
  }
  // get domicilioFiscal() {
  //   return this.regForm.get('domicilioFiscal');
  // }
  // get tipo() {
  //   return this.regForm.get('tipo');
  // }
  get estado() {
    return this.regForm.get('estado');
  }
  get userAltaId() {
    return this.regForm.get('userAltaId');
  }
  get createdAt() {
    return this.regForm.get('createdAt');
  }
  get agenteAduanalId() {
    return this.regForm.get('agenteAduanalId');
  }
  get entidadId() {
    return this.regForm.get('entidadId');
  }
  /* #endregion */
}
