import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { typeNotification } from 'app/config/config';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  empresas: Empresa[] = [];
  empresasExcel = [];
  totalRegistros = 0;
  cargando = true;
  displayedColumns = [
    'actions',
    'rfc',
    'nombre',
    'immex',
    'estado',
    'createdAt'
  ];
  inactivoTrue = false;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private empresaService: EmpresaService,
    private notificationsService: NotificationsService,
    private excelService: ExcelServiceService
  ) { }

  ngOnInit(): void {
    this.cargarEmpresas(true);
  }

  cargarEmpresas(bool: boolean) {
    this.cargando = true;
    this.empresaService.getEmpresas(bool).subscribe((empresas: any) => {
      this.dataSource = new MatTableDataSource(empresas.empresas);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalRegistros = empresas.empresas.length;
    });
    this.cargando = false;
  }

  filtrado(bool: boolean) {
    if (bool === false) {
      bool = true;
      this.inactivoTrue = false;
      this.cargarEmpresas(bool);
    } else if (bool === true) {
      bool = false;
      this.inactivoTrue = true;
      this.cargarEmpresas(bool);
    }
  }

  CreaDatosExcel(datos) {
    datos.forEach(dato => {
      const reg = {
        RFC: dato.rfc,
        Nombre: dato.nombre,
        IMMEX: dato.immex,
        Estado: dato.estado ? 'Activo' : 'Inactivo'
      };
      this.empresasExcel.push(reg);
    });
  }

  exportAsXLSX(datos): void {
    this.CreaDatosExcel(datos.filteredData);
    if (this.empresasExcel) {
      this.excelService.exportAsExcelFile(this.empresasExcel, 'Empresas:');
    } else {
      this.notificationsService.showNotification(typeNotification.ERROR, 'No se puede exportar un excel vacio');
    }
  }

  borrarEmpresa(empresa: Empresa) {
    // uso el metodo de habilitaDesahabilita empresa ya que no voy a eliminar datos,
    // siempre voy a deshabilitar para mantener la integridad de los datos
    const check = new MatSlideToggleChange(undefined, false);
    this.habilitaDeshabilitaEmpresa(empresa, check);
  }

  habilitaDeshabilitaEmpresa(empresa: Empresa, activo: MatSlideToggleChange) {
    // if (user.userId === this.usuarioService.user.userId && !activo.checked) {
    //   this.notificationsService.showNotification(typeNotification.ERROR, 'No se puede deshabilitar a si mismo');
    //   this.filtrado(this.inactivoTrue);
    //   return;
    // }

    const actDes = activo.checked ? 'activar' : 'desactivar';

    this.notificationsService.showQuestion(
      'Estás seguro?',
      `Quieres ${actDes} a la empresa ${empresa.nombre}?`
    ).then((result) => {
      if (result.isConfirmed) {
        this.empresaService.habilitaDeshabilitaEmpresa(empresa, activo.checked).subscribe((res) => {
          this.filtrado(this.inactivoTrue);
        });
      } else if (result.dismiss === swal.DismissReason.cancel) {
        this.notificationsService.showNotification(typeNotification.ERROR, 'Operación Cancelada');
        this.filtrado(this.inactivoTrue);
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    if (this.dataSource && this.dataSource.data.length > 0) {
      this.dataSource.filter = filterValue;
      this.totalRegistros = this.dataSource.filteredData.length;
    } else {
      this.notificationsService.showNotification(typeNotification.ERROR, 'No existen datos para filtrar');
    }
  }

}
