import { ExcelServiceService } from './../../shared/services/excel-service.service';
import { NotificationsService } from './../notifications/notifications.service';
import { UsuarioService } from './../users/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Usuario } from 'app/pages/users/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { typeNotification } from 'app/config/config';
import swal from 'sweetalert2'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usuarios: Usuario[] = [];
  usersExcel = [];
  totalRegistros = 0;
  cargando = true;
  // roles = ROLES_ARRAY;
  displayedColumns = [
    'actions',
    // 'foto',
    'nombre',
    'email',
    'estado',
    // 'role',
    // 'empresas',
    'createdAt'
  ];
  inactivoTrue = false;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usuarioService: UsuarioService,
    private notificationsService: NotificationsService,
    private excelService: ExcelServiceService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios(true);
  }

  cargarUsuarios(bool: boolean) {
    this.cargando = true;
    this.usuarioService.getUsuarios(bool).subscribe((users: any) => {
      this.dataSource = new MatTableDataSource(users.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalRegistros = users.users.length;
    });
    this.cargando = false;
  }

  filtrado(bool: boolean) {
    if (bool === false) {
      bool = true;
      this.inactivoTrue = false;
      this.cargarUsuarios(bool);
    } else if (bool === true) {
      bool = false;
      this.inactivoTrue = true;
      this.cargarUsuarios(bool);
    }
  }

  CreaDatosExcel(datos) {
    datos.forEach(dato => {
      const reg = {
        Nombre: dato.nombre,
        Email: dato.email,
        Estado: dato.estado ? 'Activo' : 'Inactivo'
      };
      this.usersExcel.push(reg);
    });
  }

  exportAsXLSX(datos): void {
    this.CreaDatosExcel(datos.filteredData);
    if (this.usersExcel) {
      this.excelService.exportAsExcelFile(this.usersExcel, 'Usuarios:');
    } else {
      this.notificationsService.showNotification(typeNotification.ERROR, 'No se puede exportar un excel vacio');
    }
  }

  borrarUsuario(usuario: Usuario) {
    // uso el metodo de habilitaDesahabilita usuario ya que no voy a eliminar datos,
    // siempre voy a deshabilitar para mantener la integridad de los datos
    const check = new MatSlideToggleChange(undefined, false);
    this.habilitaDeshabilitaUsuario(usuario, check);
  }

  habilitaDeshabilitaUsuario(usuario: Usuario, activo: MatSlideToggleChange) {
    if (usuario.userId === this.usuarioService.usuario.userId && !activo.checked) {
      this.notificationsService.showNotification(typeNotification.ERROR, 'No se puede deshabilitar a si mismo');
      this.filtrado(this.inactivoTrue);
      return;
    }

    const actDes = activo.checked ? 'activar' : 'desactivar';

    this.notificationsService.showQuestion(
      'Estás seguro?',
      `Quieres ${actDes} al usuario ${usuario.nombre}?`
    ).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.habilitaDeshabilitaUsuario(usuario, activo.checked).subscribe((res) => {
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
