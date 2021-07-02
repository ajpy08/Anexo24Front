import { Component, OnInit, ViewChild } from '@angular/core';
import { ExcelServiceService } from './../../shared/services/excel-service.service';
import { NotificationsService } from './../notifications/notifications.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { typeNotification } from 'app/config/config';
import swal from 'sweetalert2';
import { AgenteAduanalService } from './agente-aduanal.service';
import { AgenteAduanal } from './agente-aduanal.model';

@Component({
  selector: 'app-agentes-aduanales',
  templateUrl: './agentes-aduanales.component.html',
  styleUrls: ['./agentes-aduanales.component.css']
})
export class AgentesAduanalesComponent implements OnInit {
  agentesExcel = [];
  totalRegistros = 0;
  cargando = true;
  displayedColumns = [
    'actions',
    'patente',
    'nombre',
    'rfc',
    'curp',
    'estado',
    'createdAt'
  ];
  inactivoTrue = false;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private agenteAduanalService: AgenteAduanalService,
    private notificationsService: NotificationsService,
    private excelService: ExcelServiceService
  ) { }

  ngOnInit(): void {
    this.cargarAgentesAduanales(true);
  }

  cargarAgentesAduanales(bool: boolean) {
    this.cargando = true;
    this.agenteAduanalService.getAgentesAduanales(bool).subscribe((agentes: any) => {
      this.dataSource = new MatTableDataSource(agentes.agentes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalRegistros = agentes.agentes.length;
    });
    this.cargando = false;
  }

  filtrado(bool: boolean) {
    if (bool === false) {
      bool = true;
      this.inactivoTrue = false;
      this.cargarAgentesAduanales(bool);
    } else if (bool === true) {
      bool = false;
      this.inactivoTrue = true;
      this.cargarAgentesAduanales(bool);
    }
  }

  CreaDatosExcel(datos) {
    datos.forEach(dato => {
      const reg = {
        Patente: dato.patente,
        Nombre: dato.nombre,
        RFC: dato.rfc,
        CURP: dato.curp,
        Calle: dato.calle,
        No: dato.numero,
        CP: dato.cp,
        Colonia: dato.colonia,
        Estado: dato.estado ? 'Activo' : 'Inactivo'
      };
      this.agentesExcel.push(reg);
    });
  }

  exportAsXLSX(datos): void {
    this.CreaDatosExcel(datos.filteredData);
    if (this.agentesExcel) {
      this.excelService.exportAsExcelFile(this.agentesExcel, 'Agentes Aduanales:');
    } else {
      this.notificationsService.showNotification(typeNotification.ERROR, 'No se puede exportar un excel vacio');
    }
  }

  borrarAgenteAduanal(agenteAduanal: AgenteAduanal) {
    // uso el metodo de habilitaDesahabilita agenteAduanal ya que no voy a eliminar datos,
    // siempre voy a deshabilitar para mantener la integridad de los datos
    const check = new MatSlideToggleChange(undefined, false);
    this.habilitaDeshabilitaAgenteAduanal(agenteAduanal, check);
  }

  habilitaDeshabilitaAgenteAduanal(agenteAduanal: AgenteAduanal, activo: MatSlideToggleChange) {
    const actDes = activo.checked ? 'activar' : 'desactivar';

    this.notificationsService.showQuestion(
      'Estás seguro?',
      `Quieres ${actDes} a ${agenteAduanal.nombre}?`
    ).then((result) => {
      if (result.isConfirmed) {
        this.agenteAduanalService.habilitaDeshabilitaAgenteAduanal(agenteAduanal, activo.checked).subscribe((res) => {
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
