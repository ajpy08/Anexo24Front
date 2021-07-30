import { NotificationsService } from './../notifications/notifications.service';
import { DireccionService } from './../direcciones/direccion.service';
import { Direccion } from '../direcciones/direccion.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaService } from './empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tiposDireccion_ARRAY, typeNotification } from 'app/config/config';
const moment = _moment;
import swal from 'sweetalert2'

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  regForm: FormGroup;
  listaDirecciones: Direccion[] = [];
  url: string;

  displayedColumns = [
    'actions',
    'calle',
    'numero',
    'cp',
    'colonia',
    'domicilioFiscal',
    'tipoDireccion'
  ];

  tiposDireccion = tiposDireccion_ARRAY;
  entidades: [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private direccionService: DireccionService,
    private notificationsService: NotificationsService,
    private direcionService: DireccionService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.cargarEmpresa(id);
    } else {
      this.createdAt.disable();
    }

    this.empresaService.getEntidades().subscribe(entidades => this.entidades = entidades.entidades);
    this.url = '/empresas';
    this.direcciones.removeAt(0);
  }

  createFormGroup() {
    this.regForm = this.fb.group({
      rfc: ['', [Validators.required, Validators.minLength(12)]],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      immex: ['', [Validators.required]],
      estado: [true],
      createdAt: [moment()],
      empresaId: [''],
      calle: [''],
      numero: [''],
      cp: [''],
      colonia: [''],
      domicilioFiscal: [true],
      tipo: [''],
      direccionId: [0],
      entidadId: [''],
      direcciones: this.fb.array([this.creaDireccion('', '', '', '', '', 0, 0, 0, 0)], { validators: Validators.required }),
    });
  }

  addDireccion(): void {
    if (this.calle.value === '' || this.calle.value === undefined) {
      this.notificationsService.showNotification(typeNotification.ERROR, `Debes proporcionar una calle`);
      return;
    }
    if (this.numero.value === '' || this.numero.value === undefined) {
      this.notificationsService.showNotification(typeNotification.ERROR, `Debes proporcionar un número`);
      return;
    }
    if (this.cp.value === '' || this.cp.value === undefined) {
      this.notificationsService.showNotification(typeNotification.ERROR, `Debes proporcionar un codigo postal`);
      return;
    }
    if (this.colonia.value === '' || this.colonia.value === undefined) {
      this.notificationsService.showNotification(typeNotification.ERROR, `Debes proporcionar una colonia`);
      return;
    }
    if (this.domicilioFiscal.value === '' || this.domicilioFiscal.value === undefined) {
      this.notificationsService.showNotification(typeNotification.ERROR, `Debes proporcionar un domicilioFiscal`);
      return;
    }
    if (this.tipo.value === '' || this.tipo.value === undefined) {
      this.notificationsService.showNotification(typeNotification.ERROR, `Debes proporcionar un tipo`);
      return;
    }
    if (this.entidadId.value === '' || this.entidadId.value === undefined) {
      this.notificationsService.showNotification(typeNotification.ERROR, `Debes proporcionar una Entidad Federativa`);
      return;
    }

    this.direcciones.push(
      this.creaDireccion(this.calle.value, this.numero.value, this.cp.value,
        this.colonia.value, this.domicilioFiscal.value, this.tipo.value, 0, this.empresaId.value, this.entidadId.value));

    this.calle.setValue('');
    this.numero.setValue('');
    this.cp.setValue('');
    this.colonia.setValue('');
    // this.domicilioFiscal.setValue('');
    // this.tipo.setValue('');
  }

  creaDireccion(calle: string, numero: string, cp: string, colonia: string,
    domicilioFiscal: string, tipo: number, direccionId: number, empresaId: number, entidadId: number): FormGroup {
    return this.fb.group({
      calle: [calle],
      numero: [numero],
      cp: [cp],
      colonia: [colonia],
      domicilioFiscal: [domicilioFiscal],
      tipo: [tipo],
      direccionId: [direccionId],
      empresaId: [empresaId],
      entidadId: [entidadId]
    });
  }

  removeDireccion(index: number, direccion: Direccion) {
    if (this.empresaId.value) {
      // si es edicion
      this.notificationsService.showQuestion(
        'Estás seguro?',
        `Quieres quitar la dirección, ésta acción no se podrá deshacer?`
      ).then((result) => {
        if (result.isConfirmed) {
          this.direcionService.eliminaDireccion(direccion).subscribe((res) => {
            this.direcciones.removeAt(index);
            this.regForm.markAsDirty();
          });
        } else if (result.dismiss === swal.DismissReason.cancel) {
          this.notificationsService.showNotification(typeNotification.ERROR, 'Operación Cancelada');
        }
      });
    } else {
      this.direcciones.removeAt(index);
      this.regForm.markAsDirty();
    }

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

      this.direccionService.getDireccionesXEmpresa(id).subscribe((direcciones) => {
        direcciones.direcciones.forEach(element => {
          this.direcciones.push(
            this.creaDireccion(element.calle, element.numero, element.cp,
              element.colonia, element.domicilioFiscal, element.tipo, element.direccionId, empresa.empresaId, element.entidadId));
        });
      });

    });
  }

  guardarEmpresa() {
    if (this.regForm.valid) {
      const empresaTMP = this.regForm.value;
      this.empresaService.guardarEmpresa(this.regForm.value)
        .subscribe(async empresa => {
          if (this.regForm.get('empresaId').value === '' || this.regForm.get('empresaId').value === undefined) {
            this.regForm.get('empresaId').setValue(empresa.empresaId);
            this.router.navigate(['/empresas/', this.regForm.get('empresaId').value]);
          }
          this.direccionService.getDireccionesXEmpresa(empresa.empresaId).subscribe(direcciones => {
            if (direcciones.direcciones && direcciones.direcciones.length > 0) {
              this.direcciones.clear();
              direcciones.direcciones.forEach(element => {
                this.direcciones.push(
                  this.creaDireccion(element.calle, element.numero, element.cp,
                    element.colonia, element.domicilioFiscal, element.tipo, element.direccionId, empresa.empresaId, element.entidadId));
              });
            }
          });
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
  get direcciones() {
    return this.regForm.get('direcciones') as FormArray;
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
  get domicilioFiscal() {
    return this.regForm.get('domicilioFiscal');
  }
  get tipo() {
    return this.regForm.get('tipo');
  }
  get direccionId() {
    return this.regForm.get('direccionId');
  }
  get entidadId() {
    return this.regForm.get('entidadId');
  }
  /* #endregion */

}
